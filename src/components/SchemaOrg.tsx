import { Helmet } from 'react-helmet-async';

interface Props {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/** Injects a JSON-LD <script> block — one component per schema graph */
export function SchemaOrg({ schema }: Props) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
