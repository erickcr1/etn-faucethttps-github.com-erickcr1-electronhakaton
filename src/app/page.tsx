import Footer from "@/components/footer";
import InfoBox from "@/components/infobox";
import FaucetForm from "@components/faucet-form";
import { ThemeModeToggle } from "@ui/theme-toggle";

export default function Home() {
  const etnAmount = process.env.NEXT_PUBLIC_ETN_AMOUNT
  const cooldownPeriod = process.env.NEXT_PUBLIC_RATE_LIMIT_COOLDOWN_PERIOD_HOURS
  return (
    <>
      <main className="bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col min-h-screen items-center">
            <div className="flex-grow max-w-lg content-center">
              <div className="w-full flex flex-col px-1 pb-1 gap-6 max-w-3xl pt-6 dark:bg-gray-900 bg-gray-50 rounded-2xl">
                <section className="flex flex-col text-left gap-1 px-6">
                  <div className="inline-flex justify-between">
                    <h1 className="text-2xl font-bold">ETN Faucet</h1>
                    <ThemeModeToggle />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Claim {etnAmount} ETN every {cooldownPeriod} hours for your development and testing needs
                  </p>
                </section>
                <div className="w-full px-6 py-4 dark:bg-gray-950 bg-white rounded-2xl border border-border">
                  <FaucetForm />
                  <InfoBox>
                    These are testnet-only tokens with no real economic value
                  </InfoBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </>
  );
}
