import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import Text from '../Text';
import buttonStyles from './styles.css';
import { getClass } from '../../utils/helpers';

const getClassInternal = (className) => {
    return buttonStyles[className] || getClass(buttonStyles, className) || className;
};

const Button = props => {

    const { type,
        label,
        icon,
        onClick,
        className,
        disabled,
        disabledClassName,
        href,
        styleType,
        children,
        keyProp } = props;
    /* If you want to use both internal modular CSS (from the button itself) and external (in module context) use className as array.
       Pass the internal classes (from the button itself) like strings ('standardBtn') and the external ones already mapped (styles.[cssClassHere]). */
    var cssClass = Array.isArray(className) ? className.map(getClassInternal) : getClassInternal(className);
    if (styleType) {
        cssClass = classNames(cssClass, buttonStyles[styleType], buttonStyles.predefined);
    }

    if (!styleType && !className) {
        cssClass = classNames(cssClass, buttonStyles.standardBtn);
    }
    var disabledClass = '';
    if (disabled) {
        disabledClass = Array.isArray(disabledClassName) ? disabledClassName.map(getClassInternal) : getClassInternal(disabledClassName);
    }

    if (href) {
        return (
            <Link to={href}>
              <button disabled={disabled} type={type} className={classNames(cssClass, disabledClass)} onClick={onClick} data-test={keyProp}>
                {icon && <span className={icon} />}
                <Text>{label}</Text>
              </button>
            </Link>
        );
    }

    return (
      <button disabled={disabled} type={type} className={classNames(cssClass, disabledClass)} onClick={onClick} data-test={keyProp}>
        {icon && <span className={icon} />}
        <Text>{label}</Text>
        {children}
      </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    styleType: PropTypes.oneOf(['primaryLight', 'primaryDark', 'secondaryLight', 'secondaryDark', 'primaryDialog', 'secondaryDialog']),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    label: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    disabledClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    href: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any,
    keyProp: PropTypes.string
};

Button.defaultProps = {
    type: 'button',
    className: '',
    disabledClassName: buttonStyles.disabledBtn,
    onClick: () => {},
    keyProp: ''
};

export default Button;
