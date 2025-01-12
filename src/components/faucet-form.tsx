"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@hooks/use-toast";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { ToastAction } from "@ui/toast";
import { LucideLoaderCircle, LucideSendHorizonal } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

export default function FaucetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);
  const { toast } = useToast()

  const formSchema = z.object({
    address: z
      .string()
      .min(1, "Paste your testnet Electroneum address")
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const executeCaptcha = () => {
    setIsLoading(true);
    if (captchaRef.current) {
      captchaRef.current.execute();
    }
  };

  const onCaptchaVerify = async (token: string) => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Captcha verification failed",
        description: "Please try again.",
      });
      setIsLoading(false);
      return;
    }

    const formData = form.getValues();
    await handleSubmit({ ...formData, captcha: token });
  };

  const handleSubmit = async (
    data: z.infer<typeof formSchema> & { captcha: string }
  ) => {
    try {
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          variant: "default",
          title: "Claim successful!",
          action: (
            <ToastAction
              className="bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-black dark:hover:bg-primary/90"
              altText="View Transaction"
              onClick={() => {
                window.open(
                  `https://blockexplorer.thesecurityteam.rocks/tx/${result.txHash}`
                );
              }}
            >
              View on Block Explorer
            </ToastAction>
          ),
          className: "text-gray-700 dark:bg-gray-900 dark:text-gray-200",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Could not process your claim",
          description: `${result.error}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(executeCaptcha)} className="space-y-4">
        <div className="items-center">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <div className="inline-flex w-full gap-4">
                      <Input
                        className="w-full"
                        placeholder="Testnet wallet address"
                        {...field}
                      />
                      <Button
                        size="default"
                        disabled={isLoading}
                        type="submit"
                        className="w-20"
                      >
                        {isLoading
                          ? <LucideLoaderCircle className="animate-spin" />
                          : <LucideSendHorizonal />
                        }
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </div>
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
          onVerify={onCaptchaVerify}
          ref={captchaRef}
          size="invisible"
        />
      </form>
    </Form>
  );
}
