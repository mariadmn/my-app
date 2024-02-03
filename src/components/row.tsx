import * as React from 'react';
declare const RowAligns: ["top", "middle", "bottom", "stretch"];
declare const RowJustify: ["start", "end", "center", "space-around", "space-between"];
interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: typeof RowAligns[number];
    justify?: typeof RowJustify[number];
    prefixCls?: string;
    wrap?: boolean;
}
declare const Row: React.ForwardRefExoticComponent<RowProps & React.RefAttributes<HTMLDivElement>>;
export default Row;