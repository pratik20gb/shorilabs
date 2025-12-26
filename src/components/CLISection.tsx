import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { cn } from "@/lib/utils";

const cliCommands = [
  {
    command: "npm install -g @shorilabs/cli",
    description: "Install CLI",
  },
  {
    command: "shorilabs patterns",
    description: "List patterns",
  },
  {
    command: "shorilabs buttons",
    description: "List buttons",
  },
  {
    command: "shorilabs get aurora-glow",
    description: "Get pattern",
  },
  {
    command: "shorilabs get neon-blue --type button",
    description: "Get button",
  },
  {
    command: "shorilabs search gradient",
    description: "Search all",
  },
];

export const CLISection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { isPreviewActive, textClass, mutedClass, brightness } = useBackgroundPattern();

  const copyCommand = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    toast.success("Copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="cli" className="py-16 border-t border-border relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className={cn(
              "text-2xl font-bold tracking-tight transition-colors",
              isPreviewActive ? textClass : "text-foreground"
            )}>
              CLI
            </h2>
            <p className={cn(
              "text-sm mt-1 transition-colors",
              isPreviewActive ? mutedClass : "text-muted-foreground"
            )}>
              Install patterns and buttons from your terminal
            </p>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={cn(
              "rounded-lg overflow-hidden transition-colors",
              isPreviewActive 
                ? brightness === "dark"
                  ? "bg-black/40 backdrop-blur border border-white/10"
                  : "bg-white/80 backdrop-blur border border-black/10"
                : "bg-muted/50 border border-border"
            )}>
              {/* Terminal Header */}
              <div className={cn(
                "flex items-center justify-between px-4 py-3 border-b transition-colors",
                isPreviewActive 
                  ? brightness === "dark" ? "border-white/10" : "border-black/10"
                  : "border-border"
              )}>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className={cn(
                  "text-xs font-mono",
                  isPreviewActive 
                    ? brightness === "dark" ? "text-white/40" : "text-gray-400"
                    : "text-muted-foreground/60"
                )}>
                  @shorilabs/cli v2.0
                </span>
              </div>

              {/* Commands */}
              <div className="p-3 space-y-1">
                {cliCommands.map((cmd, index) => (
                  <div
                    key={cmd.command}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer",
                      isPreviewActive 
                        ? brightness === "dark"
                          ? "hover:bg-white/5" 
                          : "hover:bg-black/5"
                        : "hover:bg-accent"
                    )}
                    onClick={() => copyCommand(cmd.command, index)}
                  >
                    <div className="flex-1 min-w-0 flex items-center gap-3">
                      <span className={cn(
                        "text-[10px] uppercase tracking-wider w-20 flex-shrink-0 transition-colors",
                        isPreviewActive 
                          ? brightness === "dark" ? "text-white/40" : "text-gray-400"
                          : "text-muted-foreground/60"
                      )}>
                        {cmd.description}
                      </span>
                      <code className={cn(
                        "text-sm font-mono truncate transition-colors",
                        isPreviewActive 
                          ? brightness === "dark" ? "text-green-400" : "text-green-600"
                          : "text-foreground"
                      )}>
                        $ {cmd.command}
                      </code>
                    </div>
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className={cn(
                          "w-4 h-4 transition-colors",
                          isPreviewActive 
                            ? brightness === "dark" ? "text-white/40" : "text-gray-400"
                            : "text-muted-foreground"
                        )} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={cn(
                "px-4 py-3 border-t transition-colors",
                isPreviewActive 
                  ? brightness === "dark" ? "border-white/10" : "border-black/10"
                  : "border-border"
              )}>
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs transition-colors",
                    isPreviewActive 
                      ? brightness === "dark" ? "text-white/40" : "text-gray-400"
                      : "text-muted-foreground/60"
                  )}>
                    104 patterns • 29 buttons
                  </span>
                  <a
                    href="https://www.npmjs.com/package/@shorilabs/cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isPreviewActive 
                        ? brightness === "dark" 
                          ? "text-white/60 hover:text-white" 
                          : "text-gray-500 hover:text-gray-900"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    View on npm →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
