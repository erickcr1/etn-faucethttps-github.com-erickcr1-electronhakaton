import { Button } from "@ui/button";
import { LucideChevronsLeftRight, LucideCuboid, LucideGithub } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-gray-50 dark:bg-gray-900 min-w-fit">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between py-4">
          <div className="flex flex-row px-6" style={{ alignItems: "center" }}>
            <Link href="https://electroneum.com" className="block dark:hidden">
              <Image src={"electroneum-logo-dark.svg"} alt="ETN Logo" width={128} height={128} className="min-w-32" />
            </Link>
            <Link href="https://electroneum.com" className="hidden dark:block" >
              <Image src={"electroneum-logo-light.svg"} alt="ETN Logo" width={128} height={128} className="min-w-32" />
            </Link>
          </div>
          <div className="flex flex-row gap-2 px-6" style={{ alignItems: "center" }}>
            <Button variant={"outline"} asChild>
              <Link href={"https://developer.electroneum.com"} target="_blank">
                <LucideChevronsLeftRight />
                Developer Portal
              </Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href={"https://blockexplorer.electroneum.com"} target="_blank">
                <LucideCuboid />
                Explorer
              </Link>
            </Button>
            <Button variant={"default"} asChild>
              <Link href={"https://github.com/electroneum/etn-faucet"} target="_blank">
                <LucideGithub />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
