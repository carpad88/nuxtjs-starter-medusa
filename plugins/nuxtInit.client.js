export default async function (context) {
  await context.store.dispatch('initializeRegions', context)
  await context.store.dispatch('initializeCart', context)
}
