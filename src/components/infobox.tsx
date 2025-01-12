import { InfoIcon } from "lucide-react";

export default function InfoBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="inline-flex content-center items-center gap-2 bg-muted rounded p-4 text-sm text-muted-foreground w-full">
      <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="text-left text-sm">
        {children}
      </p>
    </div>
  )
}
