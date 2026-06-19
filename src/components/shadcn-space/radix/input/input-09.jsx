import { useId } from 'react'
import { Input } from '@/components/ui/input'
import { AnimatedCheckmarkCircle } from './input-19'

const InputFloatingLabel = ({ label, placeholder, value, onChange, type, wrapperClassName, className, progress, ...props }) => {
  const id = useId()

  // Calculate progress for the animated checkmark (fallback to length / 5 if not provided)
  const progressValue = progress !== undefined ? progress : (value ? Math.min(value.length / 5, 1.0) : 0.0);

  return (
    <div className={`group relative w-full ${wrapperClassName || ''}`}>
      <label
        htmlFor={id}
        className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium z-10'>
        <span className='bg-background inline-flex px-1'>{label}</span>
      </label>
      <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} className={`dark:bg-background pr-10 ${className || ''}`} {...props} />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none">
        <AnimatedCheckmarkCircle progress={progressValue} />
      </div>
    </div>
  );
}

export default InputFloatingLabel
