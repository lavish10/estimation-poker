import React from 'react';
import clsx from 'clsx';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import {AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps} from 'react-virtualized';
import {TableHead} from "@material-ui/core";

declare module '@material-ui/core/styles/withStyles' {
    // Augment the BaseCSSProperties so that we can control jss-rtl
    interface BaseCSSProperties {
        /*
         * Used to control if the rule-set should be affected by rtl transformation
         */
        flip?: boolean;
    }
}

interface Props {
    columns: any,
    dataRows: any[],
}

const styles = (theme: Theme) =>
    createStyles({
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
        },
        table: {
            // temporary right-to-left patch, waiting for
            // https://github.com/bvaughn/react-virtualized/issues/454
            '& .ReactVirtualized__Table__headerRow': {
                flip: false,
                paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
            },
        },
        tableRow: {
            cursor: 'pointer',
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
            },
        },
        tableCell: {
            flex: 1,
        },
        noClick: {
            cursor: 'initial',
        },
        tableHeader: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            // fontWeight: "bold",
            textTransform: "uppercase",


        }
    });

interface ColumnData {
    dataKey: string;
    label: string;
    numeric?: boolean;
    width: number;
}

interface Row {
    index: number;
}

interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
    columns: ColumnData[];
    headerHeight?: number;
    onRowClick?: () => void;
    rowCount: number;
    rowGetter: (row: Row) => any;
    rowHeight?: number;
}

class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({index}: Row) => {
        const {classes, onRowClick} = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer: TableCellRenderer = ({cellData, columnIndex}) => {
        const {columns, classes, rowHeight, onRowClick} = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{height: rowHeight}}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({label, columnIndex}: TableHeaderProps & { columnIndex: number }) => {
        const {headerHeight, columns, classes} = this.props;

        return (

            <TableCell
                component="div"
                className={clsx(classes.tableHeader, classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{height: headerHeight}}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>

        );
    };

    render() {
        const {classes, columns, rowHeight, headerHeight, ...tableProps} = this.props;
        return (
            <AutoSizer>
                {({height, width}) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight!}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight!}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({dataKey, ...other}, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={headerProps =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

export default function ReactVirtualizedTable(props: Props) {
    return (
        <Paper style={{height: 400, width: '100%'}}>
            <VirtualizedTable
                rowCount={props.dataRows.length}
                rowGetter={({index}) => props.dataRows[index]}
                columns={props.columns}
            />
        </Paper>
    );
}
