# usePlacesAutocomplete React Hook for using the Google Places Autocomplete Service.

This hook lets you make use of the Google Places Autocomplete Service in the simplest way possible.

You enter text, you get predictions.

This hook uses debouncing which means that you can make sure that if a user is typing it does not spam the service and eat up resources which will save you money when using this service.

I highly recommend that you read [this article about using the Google places autocomplete service with react and with hooks](https://atomizedobjects.com/blog/react/how-to-use-google-autocomplete-with-react-hooks/)

## Requirements

**You must have added the Google places script to your html head**
Add the below script to the `<head>` of your page and add in your API key.

```html
<script
  type="text/javascript"
  src="//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_GOES_HERE&language=en&libraries=places"
></script>
```

**If you use the Google Places Autocomplete Service you need to know and understand the requirements from Google:**

1. You can use Place Autocomplete even without a map.
2. If you do show a map, it must be a Google map.
3. When you display predictions from the Place Autocomplete service without a map, you must include the ['Powered by Google' logo](https://developers.google.com/places/web-service/policies#logo_requirements).

## Install

Yarn:
`yarn add @atomap/use-places-autocomplete`

NPM:
`npm install --save @atomap/use-places-autocomplete`

## Importing

`import usePlacesAutocomplete from '@atomap/use-places-autocomplete'`

## Usage

Add the following to the head of your html:

```html
<script
  type="text/javascript"
  src="//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_GOES_HERE&language=en&libraries=places"
></script>
```

Create a new component and paste the following code:

```js
import React, { useState } from 'react'
import usePlacesAutocomplete from '@atomap/use-places-autocomplete'

export default function PredictionsOnInputChange() {
  const [selectedPrediction, setSelectedPrediction] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const { predictions, error } = usePlacesAutocomplete(searchValue)

  if (error) {
    console.error(error)
  }

  const handlePredictionSelection = (e, prediction) => {
    e.preventDefault()
    setSelectedPrediction(prediction)
  }

  return (
    <>
      <form>
        <input
          name="predictionSearch"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <img
          src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
          alt="Powered by Google"
        />
        <ul>
          {predictions?.map((prediction) => (
            <li key={prediction?.place_id}>
              <button
                onClick={(e) => handlePredictionSelection(e, prediction)}
                onKeyDown={(e) => handlePredictionSelection(e, prediction)}
              >
                {prediction?.structured_formatting?.main_text || 'Not found'}
              </button>
            </li>
          ))}
        </ul>
        <h3>You searched for: {searchValue}</h3>
        <h3>
          You selected:{' '}
          {selectedPrediction?.structured_formatting?.main_text || 'None'}
        </h3>
      </form>
    </>
  )
}
```

Example with options:

```js
const { predictions, error } = usePlacesAutocomplete(searchValue, {
  debounceTimeout: 400,
  componentRestrictions: { country: 'gb' },
})
```

### Types & Arguments

| Argument                           | TypeScript Type              | JavaScript Type | Description                                        |
| ---------------------------------- | ---------------------------- | --------------- | -------------------------------------------------- |
| userInput                          | string                       | string          | A search query provided by a user.                 |
| options (optional)                 | UsePlacesAutocompleteOptions | object          | Options for the google places autocomplete service [full list available here](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest) |
| options.debounceTimeout (optional) | number                       | number          | Length of time to wait for the debounce            |
