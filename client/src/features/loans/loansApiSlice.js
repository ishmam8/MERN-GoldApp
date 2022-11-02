import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const loansAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = loansAdapter.getInitialState()

export const loansApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLoans: builder.query({
            query: () => '/loans',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedLoans = responseData.map(loan => {
                    loan.id = loan._id
                    return loan
                });
                return loansAdapter.setAll(initialState, loadedLoans)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Loan', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Loan', id }))
                    ]
                } else return [{ type: 'Loan', id: 'LIST' }]
            }
        }),
        addNewLoan: builder.mutation({
            query: initialLoan => ({
                url: '/loans',
                method: 'POST',
                body: {
                    ...initialLoan,
                }
            }),
            invalidatesTags: [
                { type: 'Loan', id: "LIST" }
            ]
        }),
        updateLoan: builder.mutation({
            query: initialLoan => ({
                url: '/loans',
                method: 'PATCH',
                body: {
                    ...initialLoan,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Loan', id: arg.id }
            ]
        }),
        deleteLoan: builder.mutation({
            query: ({ id }) => ({
                url: `/loans`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Loan', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetLoansQuery,
    useAddNewLoanMutation,
    useUpdateLoanMutation,
    useDeleteLoanMutation,
} = loansApiSlice

// returns the query result object
export const selectLoansResult = loansApiSlice.endpoints.getLoans.select()

// creates memoized selector
const selectLoansData = createSelector(
    selectLoansResult,
    loansResult => loansResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLoans,
    selectById: selectLoanById,
    selectIds: selectLoanIds
    // Pass in a selector that returns the loans slice of state
} = loansAdapter.getSelectors(state => selectLoansData(state) ?? initialState)