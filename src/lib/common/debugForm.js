import React from 'react'

function DebugForm(props) {
    return (
        <div style={{ margin: '1rem 0', background: '#f6f8fa', padding: '.5rem' }}>
            <pre style={{
                display: 'block', padding: '10px 30px', margin: '0',
                overflow: 'scroll', position: 'fixed', left: "0", top: '0',
                height: "450px"
            }}>{JSON.stringify(props.f, null, 2)}</pre>
        </div>
    )
}

export default DebugForm;
