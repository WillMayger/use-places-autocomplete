/// <reference types="googlemaps" />
import { useEffect, useState } from 'react'

export const googleAutocomplete = async (
  text: string,
  options: google.maps.places.AutocompletionRequest,
): Promise<[google.maps.places.AutocompletePrediction[], string]> =>
  new Promise((resolve) => {
    if (!text) {
      return resolve([[], 'Need valid user text input'])
    }

    // for use in things like GatsbyJS where the html is generated first
    if (typeof window === 'undefined') {
      return resolve([[], 'Need valid window object'])
    }

    if (typeof window.google === 'undefined') {
      return resolve([
        [],
        'Google places library not detected, have you imported the html script?',
      ])
    }

    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        { input: text, ...options },
        (predictions) => resolve([predictions, '']),
      )
    } catch (e) {
      resolve([[], e])
    }
  })

type HookError = string

interface UsePlacesAutocompleteOptions
  extends google.maps.places.AutocompletionRequest {
  debounceTimeout?: number
}

export default function usePlacesAutocomplete(
  userInput: string,
  options?: UsePlacesAutocompleteOptions,
): [google.maps.places.AutocompletePrediction[], HookError] {
  const { debounceTimeout, ...googleOptions } = {
    debounceTimeout: 400,
    ...(options || {}),
  }

  const [predictions, setPredictions] = useState({ predictions: [], error: '' })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return setPredictions({
        predictions: [],
        error: 'Need valid window object',
      })
    }

    const handleDebounce = setTimeout(async () => {
      try {
        if (!userInput) {
          return
        }

        const [nextPredictions, err] = await googleAutocomplete(
          userInput,
          googleOptions as google.maps.places.AutocompletionRequest,
        )
        setPredictions({ predictions: nextPredictions, error: err })
      } catch (e) {
        console.error(e)
      }
    }, debounceTimeout)

    return () => {
      clearTimeout(handleDebounce)
    }
  }, [userInput, debounceTimeout])

  return predictions
}
