import {
  Activity, Brain, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Droplets,
  Eye, EyeOff, Focus, HeartPulse, Info, Layers3, Menu, Minus, Move3d, RotateCcw,
  Search, ShieldCheck, Sparkles, Stethoscope, Wind, X, ZoomIn, ZoomOut,
} from 'lucide-react'

const icons = { activity: Activity, brain: Brain, chevronDown: ChevronDown, chevronLeft: ChevronLeft,
  chevronRight: ChevronRight, help: CircleHelp, droplet: Droplets, eye: Eye, eyeOff: EyeOff,
  focus: Focus, heart: HeartPulse, info: Info, layers: Layers3, menu: Menu, minus: Minus,
  move: Move3d, reset: RotateCcw, search: Search, shield: ShieldCheck, sparkles: Sparkles,
  stomach: Stethoscope, wind: Wind, close: X, zoomIn: ZoomIn, zoomOut: ZoomOut }

export type IconName = keyof typeof icons

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const Component = icons[name]
  return <Component aria-hidden="true" size={size} strokeWidth={1.6} />
}
