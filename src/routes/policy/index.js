import React from 'react';
import Layout from '../../components/Layout';
import Policy from '../../components/Policy';

const title = 'Page Not Found';

export default {
  path: '*',

  action() {
    return {
      title,
      component: (
        <Layout>
          <Policy />
        </Layout>
      ),
    };
  },
};
