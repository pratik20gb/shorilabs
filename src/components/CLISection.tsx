import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const cliCommands = [
  {
    command: "npm install -g @shorilabs/patterns",
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

  const copyCommand = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    toast.success("Command copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="cli" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            CLI
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Install patterns directly from your terminal
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
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-3">
              {cliCommands.map((cmd, index) => (
                <div
                  key={cmd.command}
                  className="group flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  onClick={() => copyCommand(cmd.command, index)}
                >
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">
                      {cmd.description}
                    </p>
                    <code className="text-sm font-mono text-foreground">
                      $ {cmd.command}
                    </code>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
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

