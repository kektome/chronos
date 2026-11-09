import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    </main>
  )
}
