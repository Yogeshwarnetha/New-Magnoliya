import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="referrer" content="strict-origin-when-cross-origin" />
                    <meta name="robots" content="index, follow" />
                    {/* Prevent embedding */}
                    <meta httpEquiv="X-Frame-Options" content="DENY" />
                    {/* Small inline script to block right-click before React mounts */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                (function(){
                  try{
                    document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
                    document.addEventListener('copy', function(e){ e.preventDefault(); });
                    document.addEventListener('cut', function(e){ e.preventDefault(); });
                    document.addEventListener('paste', function(e){ e.preventDefault(); });
                  } catch(e) {}
                })();
              `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
