import { DocumentationSwitches, documentationSwitches, documentationSwitchesName } from '../../../../contracts/components/form/general/documentation-values';
import { DocumentationDefinition } from '../../../../../modules/contracts/domain/interfaces/documentation';
import { useEffect, useState } from 'react';

export const useDocumentFormGeneral = (documentation: DocumentationDefinition) => {
    const [switchUser, setSwitchUser] = useState<DocumentationSwitches[]>([]);
    const [switchClient, setSwitchClient] = useState<DocumentationSwitches[]>([]);


    useEffect(() => {
        const user: DocumentationSwitches[] = [];
        const client: DocumentationSwitches[] = [];

        Object.keys(documentation).forEach((key) => {
            if (documentationSwitchesName.includes(key)) {
                const value = documentationSwitches?.find(_ => _.name === key);
                if (value) {
                    const hasServiceIncluded = (documentation as any)[key]?.hasServiceIncluded;
                    if (hasServiceIncluded) {
                        user.push(value);
                    } else {
                        client.push(value);
                    }
                }
            }
        })
        setSwitchUser(user);
        setSwitchClient(client);
    }, [documentation])

    return {
        switchUser,
        switchClient
    }
}
