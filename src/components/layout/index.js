/**
 * External Dependencies
 */

import Head from 'next/head';

/**
 * Internal Dependencies.
 */
import { AppProvider } from '../context';
import Header from './header';
import Footer from './footer';
import Seo from '../seo';
import { replaceBackendWithFrontendUrl, sanitize } from '../../utils/miscellaneous';


const Layout = ({ children, headerFooter, seo, uri }) => {
	const { header, footer } = headerFooter || {};
	const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl(JSON.stringify(seo.schema)) : null;

	return (
		<div>
			<main className="mx-auto py-4 min-h-50vh">
				{children}
			</main>
		</div>
	)
}

export default Layout
