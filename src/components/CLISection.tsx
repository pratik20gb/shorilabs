import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
    command: "shorilabs cards",
    description: "List cards",
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
    command: "shorilabs get minimal-clean --type card",
    description: "Get card",
  },
  {
    command: "shorilabs add aurora-glow",
    description: "Add pattern",
  },
  {
    command: "shorilabs add neon-blue --type button",
    description: "Add button",
  },
  {
    command: "shorilabs search gradient",
    description: "Search all",
  },
];

export const CLISection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              CLI
            </h2>
            <p className="text-sm mt-1 text-muted-foreground">
              Install components (patterns, buttons, cards, inputs, badges, loaders, avatars, toggles, dividers) from your terminal
            </p>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-lg overflow-hidden bg-muted/50 border border-border">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-mono text-muted-foreground/60">
                  @shorilabs/cli v2.0.1
                </span>
              </div>

              {/* Commands */}
              <div className="p-3 space-y-1">
                {cliCommands.map((cmd, index) => (
                  <div
                    key={cmd.command}
                    className="group flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer hover:bg-accent"
                    onClick={() => copyCommand(cmd.command, index)}
                  >
                    <div className="flex-1 min-w-0 flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-wider w-20 flex-shrink-0 text-muted-foreground/60">
                        {cmd.description}
                      </span>
                      <code className="text-sm font-mono truncate text-foreground">
                        $ {cmd.command}
                      </code>
                    </div>
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground/60 leading-relaxed">
                    <span className="hidden sm:inline">105 patterns • 29 buttons • 26 cards • 17 inputs • 21 badges • 18 loaders • 20 avatars • 13 toggles • 20 dividers</span>
                    <span className="sm:hidden">269+ components available</span>
                  </span>
                  <a
                    href="https://www.npmjs.com/package/@shorilabs/cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium transition-colors text-muted-foreground hover:text-foreground whitespace-nowrap"
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
