import { useEffect, useState } from 'react';
import { DocumentationSwitches, documentationSwitches, documentationSwitchesName } from '../../../../contracts/components/form/pet/detail/documentation-values';
import { Documentation } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';

export const useDocumentFormGeneral = (documentation: Documentation) => {
    const [switchUser, setSwitchUser] = useState<DocumentationSwitches[]>([]);
    const [switchClient, setSwitchClient] = useState<DocumentationSwitches[]>([]);
    const [isLoading, setLoading] = useState(true);


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
        setLoading(false);
    }, [documentation])

    return {
        switchUser,
        switchClient,
        isLoading
    }
}
