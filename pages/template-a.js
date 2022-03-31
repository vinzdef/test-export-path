import React from 'react'
import Link from 'next/link'

import { getPageData } from '../content-parse'

export default function TemplateA({number}) {
    return <div>Template A, Number: {number}
        <ul>
            <li>
                <Link href="/template-a" as="/first/custom/url/1"><a>/first/custom/url/1</a></Link>
            </li>
            <li>
                <Link href="/template-a" as="/another/custom/url/2"><a>/another/custom/url/2</a></Link>
            </li>
            <li>
                <Link href="/template-a" as="/custom/url/3"><a>/custom/url/3</a></Link>
            </li>
        </ul>
    </div>
}

TemplateA.getInitialProps = async function(context) {
    const {asPath} = context
    const {number} = await getPageData(asPath)
    
    return {
        number
    }
}

