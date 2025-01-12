import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="p-24 border-t border-t-border text-muted-foreground text-sm">
      <div className="container mx-auto">
        <div className="flex flex-row gap-8 justify-between">
          <Link href="https://electroneum.com" className="block dark:hidden">
            <Image src={"electroneum-logo-dark.svg"} alt="ETN Logo" width={128} height={128} className="min-w-32" />
          </Link>
          <Link href="https://electroneum.com" className="hidden dark:block" >
            <Image src={"electroneum-logo-light.svg"} alt="ETN Logo" width={128} height={128} className="min-w-32" />
          </Link>
          <div className="inline-flex gap-4 items-center">
            <Link href="https://medium.com/@ETN-Network" className="hover:underline">
              Medium
            </Link>
            |
            <Link href="https://www.facebook.com/electroneum" className="hover:underline">
              Facebook
            </Link>
            |
            <Link href="https://twitter.com/electroneum" className="hover:underline">
              X
            </Link>
            |
            <Link href="https://www.instagram.com/electroneumofficial" className="hover:underline">
              Instagram
            </Link>
            |
            <Link href="https://t.me/officialelectroneum" className="hover:underline">
              Telegram
            </Link>
            |
            <Link href="https://discord.gg/QkU7yCbc" className="hover:underline">
              Discord
            </Link>
            |
            <Link href="https://www.youtube.com/channel/UCEQvcgq9-mtqdYEM3B9y_-g" className="hover:underline">
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>

  )
}
