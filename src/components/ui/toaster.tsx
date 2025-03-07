
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
          <Toast key={id} {...props} className="cursor-pointer bg-white border-0 shadow-md rounded-lg">
            <div className="grid gap-1">
              {title && <ToastTitle className="font-semibold text-gray-800">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-gray-600">{description}</ToastDescription>
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
