import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Text from '../../../components/Text';
import Dropdown from '../../../components/Input/Dropdown';
import SearchBox from '../../../components/SearchBox';

import style from './style.css';

export class ByCustomSearch extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        if (!this.props.field) {
            this.props.setField(this.props.defaultField);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultField !== this.props.defaultField) {
            this.props.setField(nextProps.defaultField);
        }
        if (nextProps.fields !== this.props.fields) {
            this.fields = nextProps.fields;
        }
        if (nextProps.value !== this.props.value) {
            this.props.setValue(nextProps.value);
        }
    }

    handleSelect(record) {
        this.props.setField(record.value);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.value || nextProps.field !== this.props.field) {
            return true;
        }
        return false;
    }

    handleSearch(value) {
        this.props.setValue(value);
    }

    render() {
        const isDisabled = !this.props.defaultField;
        return (
            <div>
                <div className={style.customSearchDropdown}>
                    <Dropdown
                        defaultSelected={ this.props.field || this.props.defaultField}
                        placeholder={<Text>Search By</Text>}
                        keyProp='name'
                        onSelect={this.handleSelect}
                        data={this.props.fields}
                        menuAutoWidth
                    />
                </div>
                <div className={style.customSearchTextField}>
                    <SearchBox
                        defaultValue={this.props.value}
                        onSearch={this.handleSearch}
                        disabled={isDisabled}
                        placeholder={this.props.placeholder || ''}
                    />
                </div>
            </div>
        );
    }
}

// data={this.fields.filter((field) => (this.props.allowedFields.indexOf(field.key) >= 0))}

ByCustomSearch.propTypes = {
    setField: PropTypes.func.isRequired, // action
    setValue: PropTypes.func.isRequired, // action
    field: PropTypes.string,
    value: PropTypes.string,
    allowedFields: PropTypes.object,
    defaultField: PropTypes.string.isRequired,
    placeholder: PropTypes.string,

    fields: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        text: PropTypes.string
    })).isRequired
};

export default ByCustomSearch;
