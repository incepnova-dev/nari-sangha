if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "/Users/abhisekbakshi/.gradle/caches/8.13/transforms/d3fd3e7fa8f531bb8ce67a274b45539a/transformed/jetified-hermes-android-0.82.0-debug/prefab/modules/hermesvm/libs/android.x86_64/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/abhisekbakshi/.gradle/caches/8.13/transforms/d3fd3e7fa8f531bb8ce67a274b45539a/transformed/jetified-hermes-android-0.82.0-debug/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

