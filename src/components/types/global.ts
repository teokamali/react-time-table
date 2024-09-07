import { PropsWithChildren } from "react";

export interface BaseProps<T = object> extends React.FC<PropsWithChildren<T>> {}
