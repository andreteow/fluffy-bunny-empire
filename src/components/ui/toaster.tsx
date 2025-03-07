
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="cursor-pointer bg-white border-0 shadow-lg rounded-xl">
            <div className="grid gap-1">
              {title && <ToastTitle className="font-bold text-clay">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-clay">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="opacity-70 hover:opacity-100" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
