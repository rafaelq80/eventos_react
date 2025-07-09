import { useRef, forwardRef } from "react";
import { useButton } from "@react-aria/button";
import type { AriaButtonProps } from "@react-aria/button";

/**
 * Componente acessível de área interativa para mouse, baseado em div.
 * Usa React Aria para garantir acessibilidade de botão, mesmo sendo uma div.
 * Aceita todos os handlers e props de div, além de children, className e style.
 *
 * @param {MouseAreaProps} props - Propriedades do componente, incluindo eventos de mouse, classe, estilo e filhos.
 * @param {React.Ref<HTMLDivElement>} ref - Referência para o elemento div.
 * @returns {JSX.Element} Área interativa acessível para mouse.
 */
interface MouseAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const MouseArea = forwardRef<HTMLDivElement, MouseAreaProps>(
  ({ children, className, style, onClick, ...rest }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const domRef = (ref as React.RefObject<HTMLDivElement>) || localRef;

    // Passa apenas onPress (mapeando de onClick) para useButton para garantir acessibilidade
    const { buttonProps } = useButton(
      { onPress: onClick } as AriaButtonProps<"div">,
      domRef
    );

    return (
      // Div acessível, comportando-se como botão, recebendo todos os handlers e props
      <div
        {...buttonProps}
        {...rest}
        ref={domRef}
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  }
);

export default MouseArea; 