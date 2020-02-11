import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';


interface Props {
    values: any[]
    onChange: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 190,
        }
    }),
);

export default function DropDown(props: Props) {
    const classes = useStyles();
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [ labelWidth, setLabelWidth ] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);


    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Cards <ViewCarouselIcon/>
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={props.onChange}
                    labelWidth={labelWidth}
                    defaultValue={""}
                >
                    {
                        props.values.map((menuItem: any, key: number) => <MenuItem key={key}
                                                                                   value={key}>{menuItem.toString()}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
    );
}
