import React, {PropTypes} from 'react';
import Txt from '../../Txt';
import style from './style.css';

const KeyValueRow = ({ wrapperClass, keyClass, valueClass, keyNode, bordered = false, children }) => {
    return (
      <div className={`${wrapperClass} ${style.displayFlex} ${style.borderTop}`}>
        <div className={`${keyClass} ${style.keyCell} ${style.displayFlex}`}><Txt>{keyNode}</Txt></div>
        <div className={`${valueClass} ${style.valueCell} ${style.displayFlex}`}>{children}</div>
      </div>
    );
};

KeyValueRow.propTypes = {
    wrapper: PropTypes.object,
    keyNode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    wrapperClass: PropTypes.string,
    keyClass: PropTypes.string,
    valueClass: PropTypes.string,
    // valueNode: PropTypes.object,
    children: PropTypes.node,
    bordered: PropTypes.bool
};

export default KeyValueRow;
