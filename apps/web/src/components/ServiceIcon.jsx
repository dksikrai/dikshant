import React from 'react';
import { Layers, Server, Bot, ShoppingCart, Cloud, ClipboardCheck, Zap, Users, Target, Repeat, Lightbulb } from 'lucide-react';

const icons = { Layers, Server, Bot, ShoppingCart, Cloud, ClipboardCheck, Zap, Users, Target, Repeat, Lightbulb };

const ServiceIcon = ({ name, size = 20 }) => {
  const Icon = icons[name] ?? Layers;
  return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
};

export default ServiceIcon;
