import React, { useEffect } from 'react';

// IMPORTANT: Replace with your own AdSense Publisher ID and Ad Slot ID
const AD_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';
const AD_SLOT = 'YYYYYYYYYY';

const AdSenseUnit: React.FC = () => {
    useEffect(() => {
        // A small timeout helps ensure the container's layout is calculated
        // before the AdSense script tries to fill the ad slot, which prevents
        // the "No slot size for availableWidth=0" error.
        const timeoutId = setTimeout(() => {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }, 100);

        // Cleanup the timeout if the component unmounts before it fires.
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="my-6 text-center bg-slate-800/50 p-4 rounded-lg flex items-center justify-center min-h-[100px]">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={AD_SLOT}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default AdSenseUnit;