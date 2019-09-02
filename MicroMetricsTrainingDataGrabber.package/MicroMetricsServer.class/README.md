Capturer for browser-generated training data.
Use as Singleton with #instance / #resetInstance, or create with #new and use the URL:

    http://localhost:1701/metrics/

Or create with #onPort: to define a custom port.
Uses Voyage by default to store the metrics, but can be changed to memory storage (e.g. for testing). Check 'storage' protocol.