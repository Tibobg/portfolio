import React from "react";
import "./StarBorder.css";

type StarBorderOwnProps = {
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
  style?: React.CSSProperties;
};

type PolymorphicProps<T extends React.ElementType> =
  StarBorderOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "style"> & {
    as?: T;
  };

type StarBorderProps<T extends React.ElementType = "button"> = PolymorphicProps<T>;

const StarBorder = <T extends React.ElementType = "button">(props: StarBorderProps<T>) => {
  const {
    as,
    className = "",
    color = "white",
    speed = "6s",
    thickness = 1,
    children,
    style,
    ...rest
  } = props;

  // ⬇️ 1) Cast "as" vers un type qui accepte des children
  const Comp = (as ?? "button") as React.ComponentType<Record<string, unknown>>;

  // ⬇️ 2) Aligner le type des props passées à Comp, sans "any"
  const restProps = rest as unknown as Record<string, unknown>;

  const mergedStyle: React.CSSProperties = {
    padding: `${thickness}px 0`,
    ...(style ?? {}),
  };

  return (
    <Comp className={`star-border-container ${className}`} {...restProps} style={mergedStyle}>
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">
        <span className="sb-label">{children}</span>
      </div>
    </Comp>
  );
};

export default StarBorder;
