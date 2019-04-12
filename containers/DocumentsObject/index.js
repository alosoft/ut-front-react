import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import { documentTmpUploadPrefix } from '../../constants';
import {
    initState,
    fetchArchivedDocuments,
    selectAttachments,
    fetchDocumentTypes,
    addDocument,
    replaceDocument,
    changeDocumentFilter,
    changeDocumentStatusDeleted,
    changeDocumentStatusArchived
} from './actions';

import { logout } from '../../containers/LoginForm/actions';

import DocumentsListing from '../../components/Documents/ListingObject';

class DocumentsContainer extends Component {
    constructor(props) {
        super(props);
        this.initState = this.initState.bind(this);
        this.fetchDocumentTypes = this.fetchDocumentTypes.bind(this);
    }

    componentWillMount() {
        this.initState(this.props.identifier, this.props.pathname);
    }

    componentDidMount() {
        this.fetchDocumentTypes(this.props.documentTypes.get('requiresFetch'), this.props.documentTypes.get('isLoading'));
    }

    componentWillReceiveProps(newProps) {
        this.initState(newProps.identifier, newProps.pathname);
        this.fetchDocumentTypes(newProps.documentTypes.get('requiresFetch'), newProps.documentTypes.get('isLoading'));
    }

    initState(identifier, pathname) {
        if (this.props.attachments.get(identifier) === undefined) {
            this.props.initState(identifier, pathname);
        }
    }

    fetchDocumentTypes(requiresFetch, isLoading) {
        if (requiresFetch && !isLoading && this.props.identifier && this.props.documentTypeClass) {
            this.props.fetchDocumentTypes(this.props.identifier, this.props.documentTypeClass);
        }
    }

    render() {
        let {
            identifier,
            objectId,
            objectType,
            attachments,
            documents,
            documentsChanged,
            fetchArchivedDocuments,
            selectAttachments,
            permissions,
            documentTypes,
            selectedFilter,
            documentArchived,
            hasMakerChecker
        } = this.props;
        let selectedAttachment = attachments.getIn([identifier, 'selected']);
        let requiresFetch = attachments.getIn([identifier, 'remoteDocuments', 'requiresFetch']);
        let isLoading = attachments.getIn([identifier, 'remoteDocuments', 'isLoading']);
        let docTypes = documentTypes.get('data') ? documentTypes.get('data').toJS() : [];
        let docs = documents;
        let docsChanged = documentsChanged.toJS();
        if (selectedFilter && selectedFilter === 'archived') {
            docs = (documentArchived.get('data') || immutable.fromJS([])).toJS();
            docsChanged = [];
        }
        return (
            <DocumentsListing
              identifier={identifier}
              objectId={objectId}
              objectType={objectType}
              documents={docs}
              documentsChanged={docsChanged}
              selectedAttachment={selectedAttachment}
              requiresFetch={requiresFetch}
              isLoading={isLoading}
              fetchArchivedDocuments={fetchArchivedDocuments}
              onGridSelect={selectAttachments}
              permissions={permissions}
              documentTypes={docTypes}
              hasMakerChecker={hasMakerChecker}
              uploadNewDocument={(newObject) => {
                  let formatedObj = {
                      createdDate: newObject.createdDate,
                      description: newObject.description,
                      documentType: newObject.documentType,
                      documentTypeId: newObject.documentTypeId,
                      statusId: newObject.statusId,
                      attachments: [
                          {
                              filename: newObject.filename,
                              extension: newObject.extension,
                              contentType: newObject.contentType,
                              url: documentTmpUploadPrefix + newObject.filename
                          }
                      ]
                  };
                  this.props.addDocument(identifier, formatedObj);
              }}
              replaceDocument={(replaceObject) => {
                  this.props.replaceDocument(identifier, selectedAttachment.toJS(), replaceObject);
              }}
              deleteDocument={(documentObject) => {
                  this.props.changeDocumentStatusDeleted(identifier, documentObject);
              }}
              archiveDocument={(documentObject) => {
                  this.props.changeDocumentStatusArchived(identifier, documentObject);
              }}
              changeDocumentFilter={(newFilter) => {
                  this.props.changeDocumentFilter(identifier, newFilter);
              }}
              selectedFilter={selectedFilter}
              documentArchived={documentArchived}
              clearLogin={() => {
                  this.props.logout && this.props.logout();
              }}
            />
        );
    }
}

DocumentsContainer.propTypes = {
    identifier: DocumentsListing.propTypes.identifier,
    objectId: DocumentsListing.propTypes.objectId,
    objectType: DocumentsListing.propTypes.objectType,
    attachments: PropTypes.object, // immutable list
    documents: PropTypes.array,
    documentsChanged: PropTypes.object, // immutable list
    fetchArchivedDocuments: DocumentsListing.propTypes.fetchArchivedDocuments,
    initState: PropTypes.func,
    selectAttachments: PropTypes.func,
    fetchDocumentTypes: PropTypes.func,
    changeDocumentFilter: PropTypes.func,
    selectedFilter: PropTypes.string,
    documentArchived: PropTypes.object, // immutable object
    documentTypeClass: PropTypes.string.isRequired,

    permissions: DocumentsListing.propTypes.permissions,
    documentTypes: PropTypes.object,
    changeDocumentStatusDeleted: PropTypes.func.isRequired,
    changeDocumentStatusArchived: PropTypes.func.isRequired,
    replaceDocument: PropTypes.func.isRequired,
    addDocument: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    hasMakerChecker: PropTypes.bool,
    logout: PropTypes.func
};

export default connect(
    ({frontDocumentsObject}, props) => {
        return {
            attachments: frontDocumentsObject,
            documentsChanged: frontDocumentsObject.getIn([props.identifier, 'changedDocuments']) || immutable.fromJS([]),
            documentTypes: frontDocumentsObject.getIn([props.identifier, 'documentTypes']) || immutable.fromJS({}),
            selectedFilter: frontDocumentsObject.getIn([props.identifier, 'selectedFilter']),
            documentArchived: frontDocumentsObject.getIn([props.identifier, 'documentArchived']) || immutable.fromJS({})
        };
    },
    { initState, fetchArchivedDocuments, selectAttachments, fetchDocumentTypes, addDocument, replaceDocument, changeDocumentStatusDeleted, changeDocumentStatusArchived, changeDocumentFilter, logout }
)(DocumentsContainer);
