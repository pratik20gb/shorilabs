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
    toast.success("Command copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="cli" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4 tracking-tight transition-colors",
            isPreviewActive ? textClass : "text-foreground"
          )}>
            CLI
          </h2>
          <p className={cn(
            "max-w-md mx-auto text-lg transition-colors",
            isPreviewActive ? mutedClass : "text-muted-foreground"
          )}>
            Install patterns directly from your terminal
          </p>
          <p className={cn(
            "text-xs mt-2 transition-colors",
            isPreviewActive 
              ? brightness === "dark" ? "text-white/50" : "text-gray-500"
              : "text-muted-foreground/60"
          )}>
            Crafted by{" "}
            <a
              href="https://thepratik.xyz"
              className={cn(
                "font-medium transition-colors",
                isPreviewActive 
                  ? brightness === "dark" 
                    ? "text-white/70 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Pratik
            </a>
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className={cn(
            "rounded-2xl overflow-hidden transition-colors",
            isPreviewActive 
              ? brightness === "dark"
                ? "bg-black/60 backdrop-blur-xl border border-white/10"
                : "bg-white/80 backdrop-blur-xl border border-black/10 shadow-lg"
              : "bg-card border border-border"
          )}>
            {/* Terminal Header */}
            <div className={cn(
              "flex items-center gap-2 px-5 py-4 border-b transition-colors",
              isPreviewActive 
                ? brightness === "dark" ? "border-white/10" : "border-black/10"
                : "border-border"
            )}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-3">
              {cliCommands.map((cmd, index) => (
                <div
                  key={cmd.command}
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-lg transition-colors cursor-pointer",
                    isPreviewActive 
                      ? brightness === "dark"
                        ? "bg-white/5 hover:bg-white/10" 
                        : "bg-black/5 hover:bg-black/10"
                      : "bg-secondary/50 hover:bg-secondary"
                  )}
                  onClick={() => copyCommand(cmd.command, index)}
                >
                  <div>
                    <p className={cn(
                      "text-[10px] mb-1 uppercase tracking-wide transition-colors",
                      isPreviewActive 
                        ? brightness === "dark" ? "text-white/50" : "text-gray-500"
                        : "text-muted-foreground"
                    )}>
                      {cmd.description}
                    </p>
                    <code className={cn(
                      "text-sm font-mono transition-colors",
                      isPreviewActive 
                        ? brightness === "dark" ? "text-green-400" : "text-green-600"
                        : "text-foreground"
                    )}>
                      $ {cmd.command}
                    </code>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedIndex === index ? (
                      <Check className={cn("w-4 h-4", brightness === "dark" ? "text-green-400" : "text-green-600")} />
                    ) : (
                      <Copy className={cn(
                        "w-4 h-4 transition-colors",
                        isPreviewActive 
                          ? brightness === "dark" ? "text-white/50" : "text-gray-500"
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
    </section>
  );
};

