# Mock data in JSON

[JSON-Generator](https://next.json-generator.com/E1WV_M9_5) to create random data

### Example for Doctor

```
  [
        {
          'repeat(7)': {
            id: '{{index()}}',
            first_name: '{{firstName()}}',
            surname: '{{surname()}}',
            specialization(tags){
        		const spec = ['Allgemeinarzt', 'Zahnarzt', 'Hautarzt', 'HNO-Arzt' ];
        		return spec[tags.integer(0, spec.length - 1)];
      		}
          }
        }
  ]
```