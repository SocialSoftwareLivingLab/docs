import React from 'react';
import Layout from '@theme/Layout';
import MainLegacyPage from '../components/mainLegacyPage.mdx';

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
        <div style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '10px',
            paddingBottom: '10px',
        }}>
            <MainLegacyPage/>
        </div>
    </Layout>
  );
}