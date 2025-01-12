import { NextRequest } from "next/server";
import { ethers } from "ethers";
import redis from "@lib/redis";
import { limitRate } from "@lib/rate-limiter";
import { getTimeDiffAndPrettyText } from "@lib/pretty-time-diff";

const ETN_FAUCET_AMOUNT = ethers.utils.parseEther(process.env.NEXT_PUBLIC_ETN_AMOUNT ?? "10");
const COOLDOWN_PERIOD = (Number(process.env.NEXT_PUBLIC_RATE_LIMIT_COOLDOWN_PERIOD_HOURS) ?? 12) * 60 * 60; // 12 hours in seconds

const provider = new ethers.providers.JsonRpcProvider({
  url: process.env.RPC_URL as string,
  skipFetchSetup: true,
});

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

let lastNonce = -1;

async function getNextNonce() {
  const currentNonce = await wallet.getTransactionCount("pending");
  lastNonce = Math.max(lastNonce, currentNonce - 1);
  return lastNonce + 1;
}

async function verifyCaptcha(captchaResponse: string): Promise<boolean> {
  const verifyUrl = `https://hcaptcha.com/siteverify`;
  const response = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `response=${captchaResponse}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
  });
  const data = await response.json();
  return data.success;
}

export async function POST(request: NextRequest) {
  const { address, captcha } = await request.json();

  if (!ethers.utils.isAddress(address)) {
    return Response.json(
      { error: "Invalid Electroneum address" },
      { status: 400 }
    );
  }

  const lastClaimTime = await redis.get(`lastClaim:${address}`);
  const now = Math.floor(Date.now() / 1000);

  if (lastClaimTime) {
    const timeSinceLastClaim = now - parseInt(lastClaimTime);
    if (timeSinceLastClaim < COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil(
        (COOLDOWN_PERIOD - timeSinceLastClaim) / 60
      );
      const remaining = new Date(Date.now() + (remainingTime * 60 * 1000))
      return Response.json(
        {
          error: `Please wait ${getTimeDiffAndPrettyText(remaining)} before claiming again`,
        },
        { status: 429 }
      );
    }
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const isAllowed = await limitRate(ip);
  if (!isAllowed) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const isCaptchaValid = await verifyCaptcha(captcha);
  if (!isCaptchaValid) {
    return Response.json({ error: "Invalid captcha" }, { status: 400 });
  }

  try {
    const nonce = await getNextNonce();

    const tx = await wallet.sendTransaction({
      to: address,
      value: ETN_FAUCET_AMOUNT,
      nonce: nonce,
      gasPrice: await provider.getGasPrice(),
      gasLimit: 21000,
    });
    await tx.wait(1);

    // Record the claim in Redis with automatic expiration
    await redis.set(`lastClaim:${address}`, now, "EX", COOLDOWN_PERIOD);

    return Response.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Error processing claim:", error);

    if (error instanceof Error) {
      if (error.message.includes("already known")) {
        return Response.json(
          {
            error:
              "Transaction already submitted. Please wait and try again later.",
          },
          { status: 409 }
        );
      }
      if (error.message.includes("replacement fee too low")) {
        return Response.json(
          { error: "Network is busy. Please try again later." },
          { status: 503 }
        );
      }
    }

    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
