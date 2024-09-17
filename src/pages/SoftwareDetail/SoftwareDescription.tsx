import React from 'react';

interface SoftwareDescriptionProps {
    description: string;
    active: boolean;
}

export const SoftwareDescription: React.FC<SoftwareDescriptionProps> = ({ description, active }) => {
    const displayDescription: string = description.replace(/\r\n/g, '<br>');

    return (
        <>
            <div
                className={`tab-pane fade ${active ? 'show active' : ''}`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
            >
                <p dangerouslySetInnerHTML={{ __html: displayDescription }} />
            </div>
        </>
    );
};
