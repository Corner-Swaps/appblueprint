import React from 'react';
import { 
  Lightbulb, 
  Palette, 
  Cpu, 
  ShieldCheck, 
  Scale, 
  FlaskConical,
  Image, 
  Wrench,
  Send,
  Rocket, 
  Activity,
  Layers,
  Store, 
  Terminal
} from 'lucide-react';

export const renderPhaseIcon = (name: string, className = "w-5 h-5 text-slate-800 stroke-[2.2]") => {
  const props = { className };
  switch (name) {
    case 'Lightbulb': return <Lightbulb {...props} />;
    case 'Palette': return <Palette {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'Scale': return <Scale {...props} />;
    case 'FlaskConical': return <FlaskConical {...props} />;
    case 'Image': return <Image {...props} />;
    case 'Wrench': return <Wrench {...props} />;
    case 'Send': return <Send {...props} />;
    case 'Rocket': return <Rocket {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Store': return <Store {...props} />;
    case 'Terminal': return <Terminal {...props} />;
    default: return <ShieldCheck {...props} />;
  }
};
