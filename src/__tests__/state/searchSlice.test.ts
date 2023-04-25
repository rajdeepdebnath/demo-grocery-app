import searchReducer, { setSearchCriteria, clearSearch, SearchState } from '../../state/searchSlice'

test('should handle adding search criteria', () => {
  //Arrange
  const previousState: SearchState = {
    searchText: null,
    loading:false,
    error:null
  }

  //Act
  const result = searchReducer(previousState, setSearchCriteria({ searchText:'abcd' }));

  //Assert
  expect(result).toEqual({"error": null, "loading": false, "searchText": "abcd"})
})

test('should handle clearing search criteria', () => {
  //Arrange
  const previousState: SearchState = {
    searchText: null,
    loading:false,
    error:null
  }

  //Act
  const result = searchReducer(previousState, clearSearch());

  //Assert
  expect(result).toEqual({"error": null, "loading": false, "searchText": null})
})