import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../components/Button';
import Grid from '@material-ui/core/Grid';

const buttonTypes = [
    'add',
    'back',
    'cancel',
    'close',
    'close-page',
    'connection',
    'end',
    'import',
    'next',
    // 'reject',
    // 'reject-file',
    'reset',
    'retake',
    'save',
    'send',
    'validate',
    // 'validate-file',
    'custom' // value for custom buttons, example: image as a button
];

storiesOf('Button Component', module)
    .add('default button', () => (
        <Button>My button</Button>
    ))
    .add('All Button Types', () => (
        <Grid container>
            {buttonTypes.map((item, index) => (
                <Grid item key={index} style={{marginTop: '20px'}} xs={12}>
                    <Button button={item}>{item}</Button>
                </Grid>
            )
            )}
        </Grid>
    ))
    .add('small buttons', () => (
        <div>
            <Button>Normal button</Button><br />
            <Button sizeType='small'>small button</Button>
        </div>
    ))
    .add('full width buttons', () => (
        <Button fullWidth>My button</Button>
    ));
