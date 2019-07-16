import { validationTypes, textValidations, dropdownValidations } from '../../validator/constants.js';

// Listing
export const getListTableColumns = (hasMakerChecker = true) => {
    const columns = [
        {title: 'Document Type', name: 'documentType'},
        {title: 'Document Description', name: 'documentDescription'},
        {title: 'File Type', name: 'extension'},
        {title: 'Upload Date', name: 'createdDate'}
    ];

    if (hasMakerChecker) {
        columns.push({title: 'Status', name: 'statusId'});
    }

    return columns;
};

export const mapContentTypeToExtension = (contentType) => {
    let config = {
        'application/pdf': 'pdf',
        'text/plain': 'txt',
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'application/msword': 'doc',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
    };

    return config[contentType] || 'unknown';
};

export function getDocumentTypeValidators() {
    return {
        key: ['fileType'],
        type: validationTypes.dropdown,
        rules: [
            {type: dropdownValidations.isRequired, errorMessage: 'Please select a file type.'}
        ]
    };
}

export function getDocumentDescriptionValidators() {
    return {
        key: ['description'],
        type: validationTypes.text,
        rules: [
            {type: textValidations.length, maxVal: 200, errorMessage: 'Description cannot exceeds 200 characters.'}
        ]
    };
}

export function mergeDocumentsWithChanged(documents, changedDocuments) {
    changedDocuments.forEach((changedDoc) => {
        switch (changedDoc.statusId) {
            case 'deleted':
                for (let i = 0; i < documents.length; i++) {
                    if (documents[i].documentId) {
                        if (documents[i].documentId === changedDoc.documentId) {
                            documents.splice(i, 1);
                            break;
                        }
                    } else if (documents[i].documentUnapprovedId) {
                        if (documents[i].documentUnapprovedId === changedDoc.documentUnapprovedId) {
                            documents.splice(i, 1);
                            break;
                        }
                    }
                }
                break;
            case 'replaced':
            case 'pending':
            case 'archived':
                for (let i = 0; i < documents.length; i++) {
                    if (documents[i].documentId) {
                        if (documents[i].documentId === changedDoc.documentId) {
                            documents.splice(i, 1);
                            break;
                        }
                    } else if (documents[i].documentUnapprovedId) {
                        if (documents[i].documentUnapprovedId === changedDoc.documentUnapprovedId) {
                            documents.splice(i, 1);
                            break;
                        }
                    }
                }
                break;
        }
    });
    var allDocuments = changedDocuments.concat(documents);
    return allDocuments.sort(function(A, B) {
        var a = A.documentType ? A.documentType : A.documentTypeName;
        var b = B.documentType ? B.documentType : B.documentTypeName;
        return (a === b) ? 0 : +(a > b) || -1;
    });
}
