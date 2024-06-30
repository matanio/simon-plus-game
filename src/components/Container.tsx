import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return <div className="mx-auto w-full max-w-3xl px-4">{children}</div>;
}
