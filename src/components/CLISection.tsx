import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { cn } from "@/lib/utils";

const cliCommands = [
  {
    command: "npm install -g @shorilabs/patterns-cli",
    description: "Install globally",
  },
  {
    command: "shorilabs list",
    description: "List all patterns",
  },
  {
    command: 'shorilabs get "aurora-glow"',
    description: "Get a pattern",
  },
  {
    command: 'shorilabs add "grid-fade" --tailwind',
    description: "Add to project",
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
              Install patterns directly from your terminal
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
                "flex items-center gap-1.5 px-4 py-3 border-b transition-colors",
                isPreviewActive 
                  ? brightness === "dark" ? "border-white/10" : "border-black/10"
                  : "border-border"
              )}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>

              {/* Commands */}
              <div className="p-4 space-y-2">
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
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        "text-[10px] uppercase tracking-wider transition-colors",
                        isPreviewActive 
                          ? brightness === "dark" ? "text-white/40" : "text-gray-400"
                          : "text-muted-foreground/60"
                      )}>
                        {cmd.description}
                      </span>
                      <code className={cn(
                        "block text-sm font-mono mt-0.5 truncate transition-colors",
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
