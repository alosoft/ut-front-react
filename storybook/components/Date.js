import React from 'react';
import { storiesOf } from '@storybook/react';
import Date from '../../components/Date';
import ContextWrapper from './../ContextWrapper.js';

storiesOf('Date translation', module)
    .add('Default', () => (
        <ContextWrapper>
            <Date>2014, 1, 11</Date>
            <div>
                <p style={{color: 'cornflowerblue'}}>Passing '2014, 1, 11' as Date child</p>
            </div>
        </ContextWrapper>
    ));
