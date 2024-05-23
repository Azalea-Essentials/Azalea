import icons from "./icons"

// a lot more. all vanilla though
let iconsList = [
    {
      "name": "mc/blocks/acacia_trapdoor",
      "path": "textures/blocks/acacia_trapdoor"
    },
    {
      "name": "mc/blocks/amethyst_block",
      "path": "textures/blocks/amethyst_block"
    },
    {
      "name": "mc/blocks/amethyst_cluster",
      "path": "textures/blocks/amethyst_cluster"
    },
    {
      "name": "mc/blocks/ancient_debris_side",
      "path": "textures/blocks/ancient_debris_side"
    },
    {
      "name": "mc/blocks/ancient_debris_top",
      "path": "textures/blocks/ancient_debris_top"
    },
    {
      "name": "mc/blocks/angler_pottery_pattern",
      "path": "textures/blocks/angler_pottery_pattern"
    },
    {
      "name": "mc/blocks/anvil_base",
      "path": "textures/blocks/anvil_base"
    },
    {
      "name": "mc/blocks/anvil_top_damaged_0",
      "path": "textures/blocks/anvil_top_damaged_0"
    },
    {
      "name": "mc/blocks/anvil_top_damaged_1",
      "path": "textures/blocks/anvil_top_damaged_1"
    },
    {
      "name": "mc/blocks/anvil_top_damaged_2",
      "path": "textures/blocks/anvil_top_damaged_2"
    },
    {
      "name": "mc/blocks/archer_pottery_pattern",
      "path": "textures/blocks/archer_pottery_pattern"
    },
    {
      "name": "mc/blocks/arms_up_pottery_pattern",
      "path": "textures/blocks/arms_up_pottery_pattern"
    },
    {
      "name": "mc/blocks/azalea_leaves",
      "path": "textures/blocks/azalea_leaves"
    },
    {
      "name": "mc/blocks/azalea_leaves_flowers",
      "path": "textures/blocks/azalea_leaves_flowers"
    },
    {
      "name": "mc/blocks/azalea_leaves_flowers_opaque",
      "path": "textures/blocks/azalea_leaves_flowers_opaque"
    },
    {
      "name": "mc/blocks/azalea_leaves_opaque",
      "path": "textures/blocks/azalea_leaves_opaque"
    },
    {
      "name": "mc/blocks/azalea_plant",
      "path": "textures/blocks/azalea_plant"
    },
    {
      "name": "mc/blocks/azalea_side",
      "path": "textures/blocks/azalea_side"
    },
    {
      "name": "mc/blocks/azalea_top",
      "path": "textures/blocks/azalea_top"
    },
    {
      "name": "mc/blocks/bamboo_block",
      "path": "textures/blocks/bamboo_block"
    },
    {
      "name": "mc/blocks/bamboo_block_top",
      "path": "textures/blocks/bamboo_block_top"
    },
    {
      "name": "mc/blocks/bamboo_door_bottom",
      "path": "textures/blocks/bamboo_door_bottom"
    },
    {
      "name": "mc/blocks/bamboo_door_top",
      "path": "textures/blocks/bamboo_door_top"
    },
    {
      "name": "mc/blocks/bamboo_fence",
      "path": "textures/blocks/bamboo_fence"
    },
    {
      "name": "mc/blocks/bamboo_fence_gate",
      "path": "textures/blocks/bamboo_fence_gate"
    },
    {
      "name": "mc/blocks/bamboo_leaf",
      "path": "textures/blocks/bamboo_leaf"
    },
    {
      "name": "mc/blocks/bamboo_mosaic",
      "path": "textures/blocks/bamboo_mosaic"
    },
    {
      "name": "mc/blocks/bamboo_planks",
      "path": "textures/blocks/bamboo_planks"
    },
    {
      "name": "mc/blocks/bamboo_sapling",
      "path": "textures/blocks/bamboo_sapling"
    },
    {
      "name": "mc/blocks/bamboo_singleleaf",
      "path": "textures/blocks/bamboo_singleleaf"
    },
    {
      "name": "mc/blocks/bamboo_small_leaf",
      "path": "textures/blocks/bamboo_small_leaf"
    },
    {
      "name": "mc/blocks/bamboo_stem",
      "path": "textures/blocks/bamboo_stem"
    },
    {
      "name": "mc/blocks/bamboo_trapdoor",
      "path": "textures/blocks/bamboo_trapdoor"
    },
    {
      "name": "mc/blocks/barrel_bottom",
      "path": "textures/blocks/barrel_bottom"
    },
    {
      "name": "mc/blocks/barrel_side",
      "path": "textures/blocks/barrel_side"
    },
    {
      "name": "mc/blocks/barrel_top",
      "path": "textures/blocks/barrel_top"
    },
    {
      "name": "mc/blocks/barrel_top_open",
      "path": "textures/blocks/barrel_top_open"
    },
    {
      "name": "mc/blocks/barrier",
      "path": "textures/blocks/barrier"
    },
    {
      "name": "mc/blocks/basalt_side",
      "path": "textures/blocks/basalt_side"
    },
    {
      "name": "mc/blocks/basalt_top",
      "path": "textures/blocks/basalt_top"
    },
    {
      "name": "mc/blocks/beacon",
      "path": "textures/blocks/beacon"
    },
    {
      "name": "mc/blocks/bedrock",
      "path": "textures/blocks/bedrock"
    },
    {
      "name": "mc/blocks/bed_feet_end",
      "path": "textures/blocks/bed_feet_end"
    },
    {
      "name": "mc/blocks/bed_feet_side",
      "path": "textures/blocks/bed_feet_side"
    },
    {
      "name": "mc/blocks/bed_feet_top",
      "path": "textures/blocks/bed_feet_top"
    },
    {
      "name": "mc/blocks/bed_head_end",
      "path": "textures/blocks/bed_head_end"
    },
    {
      "name": "mc/blocks/bed_head_side",
      "path": "textures/blocks/bed_head_side"
    },
    {
      "name": "mc/blocks/bed_head_top",
      "path": "textures/blocks/bed_head_top"
    },
    {
      "name": "mc/blocks/beehive_front",
      "path": "textures/blocks/beehive_front"
    },
    {
      "name": "mc/blocks/beehive_front_honey",
      "path": "textures/blocks/beehive_front_honey"
    },
    {
      "name": "mc/blocks/beehive_side",
      "path": "textures/blocks/beehive_side"
    },
    {
      "name": "mc/blocks/beehive_top",
      "path": "textures/blocks/beehive_top"
    },
    {
      "name": "mc/blocks/beetroots_stage_0",
      "path": "textures/blocks/beetroots_stage_0"
    },
    {
      "name": "mc/blocks/beetroots_stage_1",
      "path": "textures/blocks/beetroots_stage_1"
    },
    {
      "name": "mc/blocks/beetroots_stage_2",
      "path": "textures/blocks/beetroots_stage_2"
    },
    {
      "name": "mc/blocks/beetroots_stage_3",
      "path": "textures/blocks/beetroots_stage_3"
    },
    {
      "name": "mc/blocks/bee_nest_bottom",
      "path": "textures/blocks/bee_nest_bottom"
    },
    {
      "name": "mc/blocks/bee_nest_front",
      "path": "textures/blocks/bee_nest_front"
    },
    {
      "name": "mc/blocks/bee_nest_front_honey",
      "path": "textures/blocks/bee_nest_front_honey"
    },
    {
      "name": "mc/blocks/bee_nest_side",
      "path": "textures/blocks/bee_nest_side"
    },
    {
      "name": "mc/blocks/bee_nest_top",
      "path": "textures/blocks/bee_nest_top"
    },
    {
      "name": "mc/blocks/bell_bottom",
      "path": "textures/blocks/bell_bottom"
    },
    {
      "name": "mc/blocks/bell_side",
      "path": "textures/blocks/bell_side"
    },
    {
      "name": "mc/blocks/bell_top",
      "path": "textures/blocks/bell_top"
    },
    {
      "name": "mc/blocks/big_dripleaf_side1",
      "path": "textures/blocks/big_dripleaf_side1"
    },
    {
      "name": "mc/blocks/big_dripleaf_side2",
      "path": "textures/blocks/big_dripleaf_side2"
    },
    {
      "name": "mc/blocks/big_dripleaf_stem",
      "path": "textures/blocks/big_dripleaf_stem"
    },
    {
      "name": "mc/blocks/big_dripleaf_top",
      "path": "textures/blocks/big_dripleaf_top"
    },
    {
      "name": "mc/blocks/birch_trapdoor",
      "path": "textures/blocks/birch_trapdoor"
    },
    {
      "name": "mc/blocks/blackstone",
      "path": "textures/blocks/blackstone"
    },
    {
      "name": "mc/blocks/blackstone_top",
      "path": "textures/blocks/blackstone_top"
    },
    {
      "name": "mc/blocks/blade_pottery_pattern",
      "path": "textures/blocks/blade_pottery_pattern"
    },
    {
      "name": "mc/blocks/blast_furnace_front_off",
      "path": "textures/blocks/blast_furnace_front_off"
    },
    {
      "name": "mc/blocks/blast_furnace_front_on",
      "path": "textures/blocks/blast_furnace_front_on"
    },
    {
      "name": "mc/blocks/blast_furnace_side",
      "path": "textures/blocks/blast_furnace_side"
    },
    {
      "name": "mc/blocks/blast_furnace_top",
      "path": "textures/blocks/blast_furnace_top"
    },
    {
      "name": "mc/blocks/blue_ice",
      "path": "textures/blocks/blue_ice"
    },
    {
      "name": "mc/blocks/bone_block_side",
      "path": "textures/blocks/bone_block_side"
    },
    {
      "name": "mc/blocks/bone_block_top",
      "path": "textures/blocks/bone_block_top"
    },
    {
      "name": "mc/blocks/bookshelf",
      "path": "textures/blocks/bookshelf"
    },
    {
      "name": "mc/blocks/border",
      "path": "textures/blocks/border"
    },
    {
      "name": "mc/blocks/brewer_pottery_pattern",
      "path": "textures/blocks/brewer_pottery_pattern"
    },
    {
      "name": "mc/blocks/brewing_stand",
      "path": "textures/blocks/brewing_stand"
    },
    {
      "name": "mc/blocks/brewing_stand_base",
      "path": "textures/blocks/brewing_stand_base"
    },
    {
      "name": "mc/blocks/brick",
      "path": "textures/blocks/brick"
    },
    {
      "name": "mc/blocks/bubble_column_down_top_a",
      "path": "textures/blocks/bubble_column_down_top_a"
    },
    {
      "name": "mc/blocks/bubble_column_down_top_b",
      "path": "textures/blocks/bubble_column_down_top_b"
    },
    {
      "name": "mc/blocks/bubble_column_down_top_c",
      "path": "textures/blocks/bubble_column_down_top_c"
    },
    {
      "name": "mc/blocks/bubble_column_down_top_d",
      "path": "textures/blocks/bubble_column_down_top_d"
    },
    {
      "name": "mc/blocks/bubble_column_inner_a",
      "path": "textures/blocks/bubble_column_inner_a"
    },
    {
      "name": "mc/blocks/bubble_column_inner_b",
      "path": "textures/blocks/bubble_column_inner_b"
    },
    {
      "name": "mc/blocks/bubble_column_outer_a",
      "path": "textures/blocks/bubble_column_outer_a"
    },
    {
      "name": "mc/blocks/bubble_column_outer_b",
      "path": "textures/blocks/bubble_column_outer_b"
    },
    {
      "name": "mc/blocks/bubble_column_outer_c",
      "path": "textures/blocks/bubble_column_outer_c"
    },
    {
      "name": "mc/blocks/bubble_column_outer_d",
      "path": "textures/blocks/bubble_column_outer_d"
    },
    {
      "name": "mc/blocks/bubble_column_outer_e",
      "path": "textures/blocks/bubble_column_outer_e"
    },
    {
      "name": "mc/blocks/bubble_column_outer_f",
      "path": "textures/blocks/bubble_column_outer_f"
    },
    {
      "name": "mc/blocks/bubble_column_outer_g",
      "path": "textures/blocks/bubble_column_outer_g"
    },
    {
      "name": "mc/blocks/bubble_column_outer_h",
      "path": "textures/blocks/bubble_column_outer_h"
    },
    {
      "name": "mc/blocks/bubble_column_up_top_a",
      "path": "textures/blocks/bubble_column_up_top_a"
    },
    {
      "name": "mc/blocks/bubble_column_up_top_b",
      "path": "textures/blocks/bubble_column_up_top_b"
    },
    {
      "name": "mc/blocks/bubble_column_up_top_c",
      "path": "textures/blocks/bubble_column_up_top_c"
    },
    {
      "name": "mc/blocks/bubble_column_up_top_d",
      "path": "textures/blocks/bubble_column_up_top_d"
    },
    {
      "name": "mc/blocks/budding_amethyst",
      "path": "textures/blocks/budding_amethyst"
    },
    {
      "name": "mc/blocks/build_allow",
      "path": "textures/blocks/build_allow"
    },
    {
      "name": "mc/blocks/build_deny",
      "path": "textures/blocks/build_deny"
    },
    {
      "name": "mc/blocks/burn_pottery_pattern",
      "path": "textures/blocks/burn_pottery_pattern"
    },
    {
      "name": "mc/blocks/cake_bottom",
      "path": "textures/blocks/cake_bottom"
    },
    {
      "name": "mc/blocks/cake_inner",
      "path": "textures/blocks/cake_inner"
    },
    {
      "name": "mc/blocks/cake_side",
      "path": "textures/blocks/cake_side"
    },
    {
      "name": "mc/blocks/cake_top",
      "path": "textures/blocks/cake_top"
    },
    {
      "name": "mc/blocks/calcite",
      "path": "textures/blocks/calcite"
    },
    {
      "name": "mc/blocks/calibrated_sculk_sensor_amethyst",
      "path": "textures/blocks/calibrated_sculk_sensor_amethyst"
    },
    {
      "name": "mc/blocks/calibrated_sculk_sensor_input_side",
      "path": "textures/blocks/calibrated_sculk_sensor_input_side"
    },
    {
      "name": "mc/blocks/calibrated_sculk_sensor_top",
      "path": "textures/blocks/calibrated_sculk_sensor_top"
    },
    {
      "name": "mc/blocks/camera_back",
      "path": "textures/blocks/camera_back"
    },
    {
      "name": "mc/blocks/camera_front",
      "path": "textures/blocks/camera_front"
    },
    {
      "name": "mc/blocks/camera_side",
      "path": "textures/blocks/camera_side"
    },
    {
      "name": "mc/blocks/camera_top",
      "path": "textures/blocks/camera_top"
    },
    {
      "name": "mc/blocks/campfire",
      "path": "textures/blocks/campfire"
    },
    {
      "name": "mc/blocks/campfire_log",
      "path": "textures/blocks/campfire_log"
    },
    {
      "name": "mc/blocks/campfire_log_lit",
      "path": "textures/blocks/campfire_log_lit"
    },
    {
      "name": "mc/blocks/carried_waterlily",
      "path": "textures/blocks/carried_waterlily"
    },
    {
      "name": "mc/blocks/carrots_stage3",
      "path": "textures/blocks/carrots_stage3"
    },
    {
      "name": "mc/blocks/carrots_stage_0",
      "path": "textures/blocks/carrots_stage_0"
    },
    {
      "name": "mc/blocks/carrots_stage_1",
      "path": "textures/blocks/carrots_stage_1"
    },
    {
      "name": "mc/blocks/carrots_stage_2",
      "path": "textures/blocks/carrots_stage_2"
    },
    {
      "name": "mc/blocks/carrots_stage_3",
      "path": "textures/blocks/carrots_stage_3"
    },
    {
      "name": "mc/blocks/cartography_table_side1",
      "path": "textures/blocks/cartography_table_side1"
    },
    {
      "name": "mc/blocks/cartography_table_side2",
      "path": "textures/blocks/cartography_table_side2"
    },
    {
      "name": "mc/blocks/cartography_table_side3",
      "path": "textures/blocks/cartography_table_side3"
    },
    {
      "name": "mc/blocks/cartography_table_top",
      "path": "textures/blocks/cartography_table_top"
    },
    {
      "name": "mc/blocks/cauldron_bottom",
      "path": "textures/blocks/cauldron_bottom"
    },
    {
      "name": "mc/blocks/cauldron_inner",
      "path": "textures/blocks/cauldron_inner"
    },
    {
      "name": "mc/blocks/cauldron_side",
      "path": "textures/blocks/cauldron_side"
    },
    {
      "name": "mc/blocks/cauldron_top",
      "path": "textures/blocks/cauldron_top"
    },
    {
      "name": "mc/blocks/cauldron_water",
      "path": "textures/blocks/cauldron_water"
    },
    {
      "name": "mc/blocks/cauldron_water_placeholder",
      "path": "textures/blocks/cauldron_water_placeholder"
    },
    {
      "name": "mc/blocks/cave_vines_body",
      "path": "textures/blocks/cave_vines_body"
    },
    {
      "name": "mc/blocks/cave_vines_body_berries",
      "path": "textures/blocks/cave_vines_body_berries"
    },
    {
      "name": "mc/blocks/cave_vines_head",
      "path": "textures/blocks/cave_vines_head"
    },
    {
      "name": "mc/blocks/cave_vines_head_berries",
      "path": "textures/blocks/cave_vines_head_berries"
    },
    {
      "name": "mc/blocks/chain1",
      "path": "textures/blocks/chain1"
    },
    {
      "name": "mc/blocks/chain2",
      "path": "textures/blocks/chain2"
    },
    {
      "name": "mc/blocks/chain_command_block_back",
      "path": "textures/blocks/chain_command_block_back"
    },
    {
      "name": "mc/blocks/chain_command_block_back_mipmap",
      "path": "textures/blocks/chain_command_block_back_mipmap"
    },
    {
      "name": "mc/blocks/chain_command_block_conditional",
      "path": "textures/blocks/chain_command_block_conditional"
    },
    {
      "name": "mc/blocks/chain_command_block_conditional_mipmap",
      "path": "textures/blocks/chain_command_block_conditional_mipmap"
    },
    {
      "name": "mc/blocks/chain_command_block_front",
      "path": "textures/blocks/chain_command_block_front"
    },
    {
      "name": "mc/blocks/chain_command_block_front_mipmap",
      "path": "textures/blocks/chain_command_block_front_mipmap"
    },
    {
      "name": "mc/blocks/chain_command_block_side",
      "path": "textures/blocks/chain_command_block_side"
    },
    {
      "name": "mc/blocks/chain_command_block_side_mipmap",
      "path": "textures/blocks/chain_command_block_side_mipmap"
    },
    {
      "name": "mc/blocks/cherry_door_bottom",
      "path": "textures/blocks/cherry_door_bottom"
    },
    {
      "name": "mc/blocks/cherry_door_top",
      "path": "textures/blocks/cherry_door_top"
    },
    {
      "name": "mc/blocks/cherry_leaves",
      "path": "textures/blocks/cherry_leaves"
    },
    {
      "name": "mc/blocks/cherry_leaves_opaque",
      "path": "textures/blocks/cherry_leaves_opaque"
    },
    {
      "name": "mc/blocks/cherry_log_side",
      "path": "textures/blocks/cherry_log_side"
    },
    {
      "name": "mc/blocks/cherry_log_top",
      "path": "textures/blocks/cherry_log_top"
    },
    {
      "name": "mc/blocks/cherry_planks",
      "path": "textures/blocks/cherry_planks"
    },
    {
      "name": "mc/blocks/cherry_sapling",
      "path": "textures/blocks/cherry_sapling"
    },
    {
      "name": "mc/blocks/cherry_trapdoor",
      "path": "textures/blocks/cherry_trapdoor"
    },
    {
      "name": "mc/blocks/chest_front",
      "path": "textures/blocks/chest_front"
    },
    {
      "name": "mc/blocks/chest_side",
      "path": "textures/blocks/chest_side"
    },
    {
      "name": "mc/blocks/chest_top",
      "path": "textures/blocks/chest_top"
    },
    {
      "name": "mc/blocks/chiseled_bookshelf_empty",
      "path": "textures/blocks/chiseled_bookshelf_empty"
    },
    {
      "name": "mc/blocks/chiseled_bookshelf_occupied",
      "path": "textures/blocks/chiseled_bookshelf_occupied"
    },
    {
      "name": "mc/blocks/chiseled_bookshelf_side",
      "path": "textures/blocks/chiseled_bookshelf_side"
    },
    {
      "name": "mc/blocks/chiseled_bookshelf_top",
      "path": "textures/blocks/chiseled_bookshelf_top"
    },
    {
      "name": "mc/blocks/chiseled_nether_bricks",
      "path": "textures/blocks/chiseled_nether_bricks"
    },
    {
      "name": "mc/blocks/chiseled_polished_blackstone",
      "path": "textures/blocks/chiseled_polished_blackstone"
    },
    {
      "name": "mc/blocks/chorus_flower",
      "path": "textures/blocks/chorus_flower"
    },
    {
      "name": "mc/blocks/chorus_flower_dead",
      "path": "textures/blocks/chorus_flower_dead"
    },
    {
      "name": "mc/blocks/chorus_plant",
      "path": "textures/blocks/chorus_plant"
    },
    {
      "name": "mc/blocks/clay",
      "path": "textures/blocks/clay"
    },
    {
      "name": "mc/blocks/coal_block",
      "path": "textures/blocks/coal_block"
    },
    {
      "name": "mc/blocks/coal_ore",
      "path": "textures/blocks/coal_ore"
    },
    {
      "name": "mc/blocks/coarse_dirt",
      "path": "textures/blocks/coarse_dirt"
    },
    {
      "name": "mc/blocks/cobblestone",
      "path": "textures/blocks/cobblestone"
    },
    {
      "name": "mc/blocks/cobblestone_mossy",
      "path": "textures/blocks/cobblestone_mossy"
    },
    {
      "name": "mc/blocks/cocoa_stage_0",
      "path": "textures/blocks/cocoa_stage_0"
    },
    {
      "name": "mc/blocks/cocoa_stage_1",
      "path": "textures/blocks/cocoa_stage_1"
    },
    {
      "name": "mc/blocks/cocoa_stage_2",
      "path": "textures/blocks/cocoa_stage_2"
    },
    {
      "name": "mc/blocks/command_block",
      "path": "textures/blocks/command_block"
    },
    {
      "name": "mc/blocks/command_block_back",
      "path": "textures/blocks/command_block_back"
    },
    {
      "name": "mc/blocks/command_block_back_mipmap",
      "path": "textures/blocks/command_block_back_mipmap"
    },
    {
      "name": "mc/blocks/command_block_conditional",
      "path": "textures/blocks/command_block_conditional"
    },
    {
      "name": "mc/blocks/command_block_conditional_mipmap",
      "path": "textures/blocks/command_block_conditional_mipmap"
    },
    {
      "name": "mc/blocks/command_block_front",
      "path": "textures/blocks/command_block_front"
    },
    {
      "name": "mc/blocks/command_block_front_mipmap",
      "path": "textures/blocks/command_block_front_mipmap"
    },
    {
      "name": "mc/blocks/command_block_side",
      "path": "textures/blocks/command_block_side"
    },
    {
      "name": "mc/blocks/command_block_side_mipmap",
      "path": "textures/blocks/command_block_side_mipmap"
    },
    {
      "name": "mc/blocks/comparator_off",
      "path": "textures/blocks/comparator_off"
    },
    {
      "name": "mc/blocks/comparator_on",
      "path": "textures/blocks/comparator_on"
    },
    {
      "name": "mc/blocks/compost",
      "path": "textures/blocks/compost"
    },
    {
      "name": "mc/blocks/composter_bottom",
      "path": "textures/blocks/composter_bottom"
    },
    {
      "name": "mc/blocks/composter_side",
      "path": "textures/blocks/composter_side"
    },
    {
      "name": "mc/blocks/composter_top",
      "path": "textures/blocks/composter_top"
    },
    {
      "name": "mc/blocks/compost_ready",
      "path": "textures/blocks/compost_ready"
    },
    {
      "name": "mc/blocks/concrete_black",
      "path": "textures/blocks/concrete_black"
    },
    {
      "name": "mc/blocks/concrete_blue",
      "path": "textures/blocks/concrete_blue"
    },
    {
      "name": "mc/blocks/concrete_brown",
      "path": "textures/blocks/concrete_brown"
    },
    {
      "name": "mc/blocks/concrete_cyan",
      "path": "textures/blocks/concrete_cyan"
    },
    {
      "name": "mc/blocks/concrete_gray",
      "path": "textures/blocks/concrete_gray"
    },
    {
      "name": "mc/blocks/concrete_green",
      "path": "textures/blocks/concrete_green"
    },
    {
      "name": "mc/blocks/concrete_light_blue",
      "path": "textures/blocks/concrete_light_blue"
    },
    {
      "name": "mc/blocks/concrete_lime",
      "path": "textures/blocks/concrete_lime"
    },
    {
      "name": "mc/blocks/concrete_magenta",
      "path": "textures/blocks/concrete_magenta"
    },
    {
      "name": "mc/blocks/concrete_orange",
      "path": "textures/blocks/concrete_orange"
    },
    {
      "name": "mc/blocks/concrete_pink",
      "path": "textures/blocks/concrete_pink"
    },
    {
      "name": "mc/blocks/concrete_powder_black",
      "path": "textures/blocks/concrete_powder_black"
    },
    {
      "name": "mc/blocks/concrete_powder_blue",
      "path": "textures/blocks/concrete_powder_blue"
    },
    {
      "name": "mc/blocks/concrete_powder_brown",
      "path": "textures/blocks/concrete_powder_brown"
    },
    {
      "name": "mc/blocks/concrete_powder_cyan",
      "path": "textures/blocks/concrete_powder_cyan"
    },
    {
      "name": "mc/blocks/concrete_powder_gray",
      "path": "textures/blocks/concrete_powder_gray"
    },
    {
      "name": "mc/blocks/concrete_powder_green",
      "path": "textures/blocks/concrete_powder_green"
    },
    {
      "name": "mc/blocks/concrete_powder_light_blue",
      "path": "textures/blocks/concrete_powder_light_blue"
    },
    {
      "name": "mc/blocks/concrete_powder_lime",
      "path": "textures/blocks/concrete_powder_lime"
    },
    {
      "name": "mc/blocks/concrete_powder_magenta",
      "path": "textures/blocks/concrete_powder_magenta"
    },
    {
      "name": "mc/blocks/concrete_powder_orange",
      "path": "textures/blocks/concrete_powder_orange"
    },
    {
      "name": "mc/blocks/concrete_powder_pink",
      "path": "textures/blocks/concrete_powder_pink"
    },
    {
      "name": "mc/blocks/concrete_powder_purple",
      "path": "textures/blocks/concrete_powder_purple"
    },
    {
      "name": "mc/blocks/concrete_powder_red",
      "path": "textures/blocks/concrete_powder_red"
    },
    {
      "name": "mc/blocks/concrete_powder_silver",
      "path": "textures/blocks/concrete_powder_silver"
    },
    {
      "name": "mc/blocks/concrete_powder_white",
      "path": "textures/blocks/concrete_powder_white"
    },
    {
      "name": "mc/blocks/concrete_powder_yellow",
      "path": "textures/blocks/concrete_powder_yellow"
    },
    {
      "name": "mc/blocks/concrete_purple",
      "path": "textures/blocks/concrete_purple"
    },
    {
      "name": "mc/blocks/concrete_red",
      "path": "textures/blocks/concrete_red"
    },
    {
      "name": "mc/blocks/concrete_silver",
      "path": "textures/blocks/concrete_silver"
    },
    {
      "name": "mc/blocks/concrete_white",
      "path": "textures/blocks/concrete_white"
    },
    {
      "name": "mc/blocks/concrete_yellow",
      "path": "textures/blocks/concrete_yellow"
    },
    {
      "name": "mc/blocks/conduit_base",
      "path": "textures/blocks/conduit_base"
    },
    {
      "name": "mc/blocks/conduit_cage",
      "path": "textures/blocks/conduit_cage"
    },
    {
      "name": "mc/blocks/conduit_closed",
      "path": "textures/blocks/conduit_closed"
    },
    {
      "name": "mc/blocks/conduit_open",
      "path": "textures/blocks/conduit_open"
    },
    {
      "name": "mc/blocks/conduit_wind_horizontal",
      "path": "textures/blocks/conduit_wind_horizontal"
    },
    {
      "name": "mc/blocks/conduit_wind_vertical",
      "path": "textures/blocks/conduit_wind_vertical"
    },
    {
      "name": "mc/blocks/copper_block",
      "path": "textures/blocks/copper_block"
    },
    {
      "name": "mc/blocks/copper_ore",
      "path": "textures/blocks/copper_ore"
    },
    {
      "name": "mc/blocks/coral_blue",
      "path": "textures/blocks/coral_blue"
    },
    {
      "name": "mc/blocks/coral_blue_dead",
      "path": "textures/blocks/coral_blue_dead"
    },
    {
      "name": "mc/blocks/coral_fan_blue",
      "path": "textures/blocks/coral_fan_blue"
    },
    {
      "name": "mc/blocks/coral_fan_blue_dead",
      "path": "textures/blocks/coral_fan_blue_dead"
    },
    {
      "name": "mc/blocks/coral_fan_pink",
      "path": "textures/blocks/coral_fan_pink"
    },
    {
      "name": "mc/blocks/coral_fan_pink_dead",
      "path": "textures/blocks/coral_fan_pink_dead"
    },
    {
      "name": "mc/blocks/coral_fan_purple",
      "path": "textures/blocks/coral_fan_purple"
    },
    {
      "name": "mc/blocks/coral_fan_purple_dead",
      "path": "textures/blocks/coral_fan_purple_dead"
    },
    {
      "name": "mc/blocks/coral_fan_red",
      "path": "textures/blocks/coral_fan_red"
    },
    {
      "name": "mc/blocks/coral_fan_red_dead",
      "path": "textures/blocks/coral_fan_red_dead"
    },
    {
      "name": "mc/blocks/coral_fan_yellow",
      "path": "textures/blocks/coral_fan_yellow"
    },
    {
      "name": "mc/blocks/coral_fan_yellow_dead",
      "path": "textures/blocks/coral_fan_yellow_dead"
    },
    {
      "name": "mc/blocks/coral_pink",
      "path": "textures/blocks/coral_pink"
    },
    {
      "name": "mc/blocks/coral_pink_dead",
      "path": "textures/blocks/coral_pink_dead"
    },
    {
      "name": "mc/blocks/coral_plant_blue",
      "path": "textures/blocks/coral_plant_blue"
    },
    {
      "name": "mc/blocks/coral_plant_blue_dead",
      "path": "textures/blocks/coral_plant_blue_dead"
    },
    {
      "name": "mc/blocks/coral_plant_pink",
      "path": "textures/blocks/coral_plant_pink"
    },
    {
      "name": "mc/blocks/coral_plant_pink_dead",
      "path": "textures/blocks/coral_plant_pink_dead"
    },
    {
      "name": "mc/blocks/coral_plant_purple",
      "path": "textures/blocks/coral_plant_purple"
    },
    {
      "name": "mc/blocks/coral_plant_purple_dead",
      "path": "textures/blocks/coral_plant_purple_dead"
    },
    {
      "name": "mc/blocks/coral_plant_red",
      "path": "textures/blocks/coral_plant_red"
    },
    {
      "name": "mc/blocks/coral_plant_red_dead",
      "path": "textures/blocks/coral_plant_red_dead"
    },
    {
      "name": "mc/blocks/coral_plant_yellow",
      "path": "textures/blocks/coral_plant_yellow"
    },
    {
      "name": "mc/blocks/coral_plant_yellow_dead",
      "path": "textures/blocks/coral_plant_yellow_dead"
    },
    {
      "name": "mc/blocks/coral_purple",
      "path": "textures/blocks/coral_purple"
    },
    {
      "name": "mc/blocks/coral_purple_dead",
      "path": "textures/blocks/coral_purple_dead"
    },
    {
      "name": "mc/blocks/coral_red",
      "path": "textures/blocks/coral_red"
    },
    {
      "name": "mc/blocks/coral_red_dead",
      "path": "textures/blocks/coral_red_dead"
    },
    {
      "name": "mc/blocks/coral_yellow",
      "path": "textures/blocks/coral_yellow"
    },
    {
      "name": "mc/blocks/coral_yellow_dead",
      "path": "textures/blocks/coral_yellow_dead"
    },
    {
      "name": "mc/blocks/cracked_nether_bricks",
      "path": "textures/blocks/cracked_nether_bricks"
    },
    {
      "name": "mc/blocks/cracked_polished_blackstone_bricks",
      "path": "textures/blocks/cracked_polished_blackstone_bricks"
    },
    {
      "name": "mc/blocks/crafting_table_front",
      "path": "textures/blocks/crafting_table_front"
    },
    {
      "name": "mc/blocks/crafting_table_side",
      "path": "textures/blocks/crafting_table_side"
    },
    {
      "name": "mc/blocks/crafting_table_top",
      "path": "textures/blocks/crafting_table_top"
    },
    {
      "name": "mc/blocks/crimson_fungus",
      "path": "textures/blocks/crimson_fungus"
    },
    {
      "name": "mc/blocks/crimson_nylium_side",
      "path": "textures/blocks/crimson_nylium_side"
    },
    {
      "name": "mc/blocks/crimson_nylium_top",
      "path": "textures/blocks/crimson_nylium_top"
    },
    {
      "name": "mc/blocks/crimson_roots",
      "path": "textures/blocks/crimson_roots"
    },
    {
      "name": "mc/blocks/crimson_roots_pot",
      "path": "textures/blocks/crimson_roots_pot"
    },
    {
      "name": "mc/blocks/crying_obsidian",
      "path": "textures/blocks/crying_obsidian"
    },
    {
      "name": "mc/blocks/cut_copper",
      "path": "textures/blocks/cut_copper"
    },
    {
      "name": "mc/blocks/danger_pottery_pattern",
      "path": "textures/blocks/danger_pottery_pattern"
    },
    {
      "name": "mc/blocks/dark_oak_trapdoor",
      "path": "textures/blocks/dark_oak_trapdoor"
    },
    {
      "name": "mc/blocks/daylight_detector_inverted_top",
      "path": "textures/blocks/daylight_detector_inverted_top"
    },
    {
      "name": "mc/blocks/daylight_detector_side",
      "path": "textures/blocks/daylight_detector_side"
    },
    {
      "name": "mc/blocks/daylight_detector_top",
      "path": "textures/blocks/daylight_detector_top"
    },
    {
      "name": "mc/blocks/deadbush",
      "path": "textures/blocks/deadbush"
    },
    {
      "name": "mc/blocks/decorated_pot_base",
      "path": "textures/blocks/decorated_pot_base"
    },
    {
      "name": "mc/blocks/decorated_pot_side",
      "path": "textures/blocks/decorated_pot_side"
    },
    {
      "name": "mc/blocks/diamond_block",
      "path": "textures/blocks/diamond_block"
    },
    {
      "name": "mc/blocks/diamond_ore",
      "path": "textures/blocks/diamond_ore"
    },
    {
      "name": "mc/blocks/dirt",
      "path": "textures/blocks/dirt"
    },
    {
      "name": "mc/blocks/dirt_podzol_side",
      "path": "textures/blocks/dirt_podzol_side"
    },
    {
      "name": "mc/blocks/dirt_podzol_top",
      "path": "textures/blocks/dirt_podzol_top"
    },
    {
      "name": "mc/blocks/dirt_with_roots",
      "path": "textures/blocks/dirt_with_roots"
    },
    {
      "name": "mc/blocks/dispenser_front_horizontal",
      "path": "textures/blocks/dispenser_front_horizontal"
    },
    {
      "name": "mc/blocks/dispenser_front_vertical",
      "path": "textures/blocks/dispenser_front_vertical"
    },
    {
      "name": "mc/blocks/door_acacia_lower",
      "path": "textures/blocks/door_acacia_lower"
    },
    {
      "name": "mc/blocks/door_acacia_upper",
      "path": "textures/blocks/door_acacia_upper"
    },
    {
      "name": "mc/blocks/door_birch_lower",
      "path": "textures/blocks/door_birch_lower"
    },
    {
      "name": "mc/blocks/door_birch_upper",
      "path": "textures/blocks/door_birch_upper"
    },
    {
      "name": "mc/blocks/door_dark_oak_lower",
      "path": "textures/blocks/door_dark_oak_lower"
    },
    {
      "name": "mc/blocks/door_dark_oak_upper",
      "path": "textures/blocks/door_dark_oak_upper"
    },
    {
      "name": "mc/blocks/door_iron_lower",
      "path": "textures/blocks/door_iron_lower"
    },
    {
      "name": "mc/blocks/door_iron_upper",
      "path": "textures/blocks/door_iron_upper"
    },
    {
      "name": "mc/blocks/door_jungle_lower",
      "path": "textures/blocks/door_jungle_lower"
    },
    {
      "name": "mc/blocks/door_jungle_upper",
      "path": "textures/blocks/door_jungle_upper"
    },
    {
      "name": "mc/blocks/door_spruce_lower",
      "path": "textures/blocks/door_spruce_lower"
    },
    {
      "name": "mc/blocks/door_spruce_upper",
      "path": "textures/blocks/door_spruce_upper"
    },
    {
      "name": "mc/blocks/door_wood_lower",
      "path": "textures/blocks/door_wood_lower"
    },
    {
      "name": "mc/blocks/door_wood_upper",
      "path": "textures/blocks/door_wood_upper"
    },
    {
      "name": "mc/blocks/double_plant_fern_carried",
      "path": "textures/blocks/double_plant_fern_carried"
    },
    {
      "name": "mc/blocks/double_plant_grass_carried",
      "path": "textures/blocks/double_plant_grass_carried"
    },
    {
      "name": "mc/blocks/double_plant_paeonia_bottom",
      "path": "textures/blocks/double_plant_paeonia_bottom"
    },
    {
      "name": "mc/blocks/double_plant_paeonia_top",
      "path": "textures/blocks/double_plant_paeonia_top"
    },
    {
      "name": "mc/blocks/double_plant_rose_bottom",
      "path": "textures/blocks/double_plant_rose_bottom"
    },
    {
      "name": "mc/blocks/double_plant_rose_top",
      "path": "textures/blocks/double_plant_rose_top"
    },
    {
      "name": "mc/blocks/double_plant_sunflower_back",
      "path": "textures/blocks/double_plant_sunflower_back"
    },
    {
      "name": "mc/blocks/double_plant_sunflower_bottom",
      "path": "textures/blocks/double_plant_sunflower_bottom"
    },
    {
      "name": "mc/blocks/double_plant_sunflower_front",
      "path": "textures/blocks/double_plant_sunflower_front"
    },
    {
      "name": "mc/blocks/double_plant_sunflower_top",
      "path": "textures/blocks/double_plant_sunflower_top"
    },
    {
      "name": "mc/blocks/dragon_egg",
      "path": "textures/blocks/dragon_egg"
    },
    {
      "name": "mc/blocks/dried_kelp_side_a",
      "path": "textures/blocks/dried_kelp_side_a"
    },
    {
      "name": "mc/blocks/dried_kelp_side_b",
      "path": "textures/blocks/dried_kelp_side_b"
    },
    {
      "name": "mc/blocks/dried_kelp_top",
      "path": "textures/blocks/dried_kelp_top"
    },
    {
      "name": "mc/blocks/dripstone_block",
      "path": "textures/blocks/dripstone_block"
    },
    {
      "name": "mc/blocks/dropper_front_horizontal",
      "path": "textures/blocks/dropper_front_horizontal"
    },
    {
      "name": "mc/blocks/dropper_front_vertical",
      "path": "textures/blocks/dropper_front_vertical"
    },
    {
      "name": "mc/blocks/emerald_block",
      "path": "textures/blocks/emerald_block"
    },
    {
      "name": "mc/blocks/emerald_ore",
      "path": "textures/blocks/emerald_ore"
    },
    {
      "name": "mc/blocks/enchanting_table_bottom",
      "path": "textures/blocks/enchanting_table_bottom"
    },
    {
      "name": "mc/blocks/enchanting_table_side",
      "path": "textures/blocks/enchanting_table_side"
    },
    {
      "name": "mc/blocks/enchanting_table_top",
      "path": "textures/blocks/enchanting_table_top"
    },
    {
      "name": "mc/blocks/ender_chest_front",
      "path": "textures/blocks/ender_chest_front"
    },
    {
      "name": "mc/blocks/ender_chest_side",
      "path": "textures/blocks/ender_chest_side"
    },
    {
      "name": "mc/blocks/ender_chest_top",
      "path": "textures/blocks/ender_chest_top"
    },
    {
      "name": "mc/blocks/endframe_eye",
      "path": "textures/blocks/endframe_eye"
    },
    {
      "name": "mc/blocks/endframe_side",
      "path": "textures/blocks/endframe_side"
    },
    {
      "name": "mc/blocks/endframe_top",
      "path": "textures/blocks/endframe_top"
    },
    {
      "name": "mc/blocks/end_bricks",
      "path": "textures/blocks/end_bricks"
    },
    {
      "name": "mc/blocks/end_gateway",
      "path": "textures/blocks/end_gateway"
    },
    {
      "name": "mc/blocks/end_portal",
      "path": "textures/blocks/end_portal"
    },
    {
      "name": "mc/blocks/end_rod",
      "path": "textures/blocks/end_rod"
    },
    {
      "name": "mc/blocks/end_stone",
      "path": "textures/blocks/end_stone"
    },
    {
      "name": "mc/blocks/explorer_pottery_pattern",
      "path": "textures/blocks/explorer_pottery_pattern"
    },
    {
      "name": "mc/blocks/exposed_copper",
      "path": "textures/blocks/exposed_copper"
    },
    {
      "name": "mc/blocks/exposed_cut_copper",
      "path": "textures/blocks/exposed_cut_copper"
    },
    {
      "name": "mc/blocks/farmland_dry",
      "path": "textures/blocks/farmland_dry"
    },
    {
      "name": "mc/blocks/farmland_wet",
      "path": "textures/blocks/farmland_wet"
    },
    {
      "name": "mc/blocks/fire_0",
      "path": "textures/blocks/fire_0"
    },
    {
      "name": "mc/blocks/fire_0_placeholder",
      "path": "textures/blocks/fire_0_placeholder"
    },
    {
      "name": "mc/blocks/fire_1",
      "path": "textures/blocks/fire_1"
    },
    {
      "name": "mc/blocks/fire_1_placeholder",
      "path": "textures/blocks/fire_1_placeholder"
    },
    {
      "name": "mc/blocks/fletcher_table_side1",
      "path": "textures/blocks/fletcher_table_side1"
    },
    {
      "name": "mc/blocks/fletcher_table_side2",
      "path": "textures/blocks/fletcher_table_side2"
    },
    {
      "name": "mc/blocks/fletcher_table_top",
      "path": "textures/blocks/fletcher_table_top"
    },
    {
      "name": "mc/blocks/flowering_azalea_side",
      "path": "textures/blocks/flowering_azalea_side"
    },
    {
      "name": "mc/blocks/flowering_azalea_top",
      "path": "textures/blocks/flowering_azalea_top"
    },
    {
      "name": "mc/blocks/flower_allium",
      "path": "textures/blocks/flower_allium"
    },
    {
      "name": "mc/blocks/flower_blue_orchid",
      "path": "textures/blocks/flower_blue_orchid"
    },
    {
      "name": "mc/blocks/flower_cornflower",
      "path": "textures/blocks/flower_cornflower"
    },
    {
      "name": "mc/blocks/flower_dandelion",
      "path": "textures/blocks/flower_dandelion"
    },
    {
      "name": "mc/blocks/flower_houstonia",
      "path": "textures/blocks/flower_houstonia"
    },
    {
      "name": "mc/blocks/flower_lily_of_the_valley",
      "path": "textures/blocks/flower_lily_of_the_valley"
    },
    {
      "name": "mc/blocks/flower_oxeye_daisy",
      "path": "textures/blocks/flower_oxeye_daisy"
    },
    {
      "name": "mc/blocks/flower_paeonia",
      "path": "textures/blocks/flower_paeonia"
    },
    {
      "name": "mc/blocks/flower_pot",
      "path": "textures/blocks/flower_pot"
    },
    {
      "name": "mc/blocks/flower_rose",
      "path": "textures/blocks/flower_rose"
    },
    {
      "name": "mc/blocks/flower_rose_blue",
      "path": "textures/blocks/flower_rose_blue"
    },
    {
      "name": "mc/blocks/flower_tulip_orange",
      "path": "textures/blocks/flower_tulip_orange"
    },
    {
      "name": "mc/blocks/flower_tulip_pink",
      "path": "textures/blocks/flower_tulip_pink"
    },
    {
      "name": "mc/blocks/flower_tulip_red",
      "path": "textures/blocks/flower_tulip_red"
    },
    {
      "name": "mc/blocks/flower_tulip_white",
      "path": "textures/blocks/flower_tulip_white"
    },
    {
      "name": "mc/blocks/flower_wither_rose",
      "path": "textures/blocks/flower_wither_rose"
    },
    {
      "name": "mc/blocks/friend_pottery_pattern",
      "path": "textures/blocks/friend_pottery_pattern"
    },
    {
      "name": "mc/blocks/frogspawn",
      "path": "textures/blocks/frogspawn"
    },
    {
      "name": "mc/blocks/frosted_ice_0",
      "path": "textures/blocks/frosted_ice_0"
    },
    {
      "name": "mc/blocks/frosted_ice_1",
      "path": "textures/blocks/frosted_ice_1"
    },
    {
      "name": "mc/blocks/frosted_ice_2",
      "path": "textures/blocks/frosted_ice_2"
    },
    {
      "name": "mc/blocks/frosted_ice_3",
      "path": "textures/blocks/frosted_ice_3"
    },
    {
      "name": "mc/blocks/furnace_front_off",
      "path": "textures/blocks/furnace_front_off"
    },
    {
      "name": "mc/blocks/furnace_front_on",
      "path": "textures/blocks/furnace_front_on"
    },
    {
      "name": "mc/blocks/furnace_side",
      "path": "textures/blocks/furnace_side"
    },
    {
      "name": "mc/blocks/furnace_top",
      "path": "textures/blocks/furnace_top"
    },
    {
      "name": "mc/blocks/gilded_blackstone",
      "path": "textures/blocks/gilded_blackstone"
    },
    {
      "name": "mc/blocks/glass",
      "path": "textures/blocks/glass"
    },
    {
      "name": "mc/blocks/glass_black",
      "path": "textures/blocks/glass_black"
    },
    {
      "name": "mc/blocks/glass_blue",
      "path": "textures/blocks/glass_blue"
    },
    {
      "name": "mc/blocks/glass_brown",
      "path": "textures/blocks/glass_brown"
    },
    {
      "name": "mc/blocks/glass_cyan",
      "path": "textures/blocks/glass_cyan"
    },
    {
      "name": "mc/blocks/glass_gray",
      "path": "textures/blocks/glass_gray"
    },
    {
      "name": "mc/blocks/glass_green",
      "path": "textures/blocks/glass_green"
    },
    {
      "name": "mc/blocks/glass_light_blue",
      "path": "textures/blocks/glass_light_blue"
    },
    {
      "name": "mc/blocks/glass_lime",
      "path": "textures/blocks/glass_lime"
    },
    {
      "name": "mc/blocks/glass_magenta",
      "path": "textures/blocks/glass_magenta"
    },
    {
      "name": "mc/blocks/glass_orange",
      "path": "textures/blocks/glass_orange"
    },
    {
      "name": "mc/blocks/glass_pane_top",
      "path": "textures/blocks/glass_pane_top"
    },
    {
      "name": "mc/blocks/glass_pane_top_black",
      "path": "textures/blocks/glass_pane_top_black"
    },
    {
      "name": "mc/blocks/glass_pane_top_blue",
      "path": "textures/blocks/glass_pane_top_blue"
    },
    {
      "name": "mc/blocks/glass_pane_top_brown",
      "path": "textures/blocks/glass_pane_top_brown"
    },
    {
      "name": "mc/blocks/glass_pane_top_cyan",
      "path": "textures/blocks/glass_pane_top_cyan"
    },
    {
      "name": "mc/blocks/glass_pane_top_gray",
      "path": "textures/blocks/glass_pane_top_gray"
    },
    {
      "name": "mc/blocks/glass_pane_top_green",
      "path": "textures/blocks/glass_pane_top_green"
    },
    {
      "name": "mc/blocks/glass_pane_top_light_blue",
      "path": "textures/blocks/glass_pane_top_light_blue"
    },
    {
      "name": "mc/blocks/glass_pane_top_lime",
      "path": "textures/blocks/glass_pane_top_lime"
    },
    {
      "name": "mc/blocks/glass_pane_top_magenta",
      "path": "textures/blocks/glass_pane_top_magenta"
    },
    {
      "name": "mc/blocks/glass_pane_top_orange",
      "path": "textures/blocks/glass_pane_top_orange"
    },
    {
      "name": "mc/blocks/glass_pane_top_pink",
      "path": "textures/blocks/glass_pane_top_pink"
    },
    {
      "name": "mc/blocks/glass_pane_top_purple",
      "path": "textures/blocks/glass_pane_top_purple"
    },
    {
      "name": "mc/blocks/glass_pane_top_red",
      "path": "textures/blocks/glass_pane_top_red"
    },
    {
      "name": "mc/blocks/glass_pane_top_silver",
      "path": "textures/blocks/glass_pane_top_silver"
    },
    {
      "name": "mc/blocks/glass_pane_top_white",
      "path": "textures/blocks/glass_pane_top_white"
    },
    {
      "name": "mc/blocks/glass_pane_top_yellow",
      "path": "textures/blocks/glass_pane_top_yellow"
    },
    {
      "name": "mc/blocks/glass_pink",
      "path": "textures/blocks/glass_pink"
    },
    {
      "name": "mc/blocks/glass_purple",
      "path": "textures/blocks/glass_purple"
    },
    {
      "name": "mc/blocks/glass_red",
      "path": "textures/blocks/glass_red"
    },
    {
      "name": "mc/blocks/glass_silver",
      "path": "textures/blocks/glass_silver"
    },
    {
      "name": "mc/blocks/glass_white",
      "path": "textures/blocks/glass_white"
    },
    {
      "name": "mc/blocks/glass_yellow",
      "path": "textures/blocks/glass_yellow"
    },
    {
      "name": "mc/blocks/glazed_terracotta_black",
      "path": "textures/blocks/glazed_terracotta_black"
    },
    {
      "name": "mc/blocks/glazed_terracotta_blue",
      "path": "textures/blocks/glazed_terracotta_blue"
    },
    {
      "name": "mc/blocks/glazed_terracotta_brown",
      "path": "textures/blocks/glazed_terracotta_brown"
    },
    {
      "name": "mc/blocks/glazed_terracotta_cyan",
      "path": "textures/blocks/glazed_terracotta_cyan"
    },
    {
      "name": "mc/blocks/glazed_terracotta_gray",
      "path": "textures/blocks/glazed_terracotta_gray"
    },
    {
      "name": "mc/blocks/glazed_terracotta_green",
      "path": "textures/blocks/glazed_terracotta_green"
    },
    {
      "name": "mc/blocks/glazed_terracotta_light_blue",
      "path": "textures/blocks/glazed_terracotta_light_blue"
    },
    {
      "name": "mc/blocks/glazed_terracotta_lime",
      "path": "textures/blocks/glazed_terracotta_lime"
    },
    {
      "name": "mc/blocks/glazed_terracotta_magenta",
      "path": "textures/blocks/glazed_terracotta_magenta"
    },
    {
      "name": "mc/blocks/glazed_terracotta_orange",
      "path": "textures/blocks/glazed_terracotta_orange"
    },
    {
      "name": "mc/blocks/glazed_terracotta_pink",
      "path": "textures/blocks/glazed_terracotta_pink"
    },
    {
      "name": "mc/blocks/glazed_terracotta_purple",
      "path": "textures/blocks/glazed_terracotta_purple"
    },
    {
      "name": "mc/blocks/glazed_terracotta_red",
      "path": "textures/blocks/glazed_terracotta_red"
    },
    {
      "name": "mc/blocks/glazed_terracotta_silver",
      "path": "textures/blocks/glazed_terracotta_silver"
    },
    {
      "name": "mc/blocks/glazed_terracotta_white",
      "path": "textures/blocks/glazed_terracotta_white"
    },
    {
      "name": "mc/blocks/glazed_terracotta_yellow",
      "path": "textures/blocks/glazed_terracotta_yellow"
    },
    {
      "name": "mc/blocks/glowing_obsidian",
      "path": "textures/blocks/glowing_obsidian"
    },
    {
      "name": "mc/blocks/glowstone",
      "path": "textures/blocks/glowstone"
    },
    {
      "name": "mc/blocks/glow_item_frame",
      "path": "textures/blocks/glow_item_frame"
    },
    {
      "name": "mc/blocks/glow_lichen",
      "path": "textures/blocks/glow_lichen"
    },
    {
      "name": "mc/blocks/gold_block",
      "path": "textures/blocks/gold_block"
    },
    {
      "name": "mc/blocks/gold_ore",
      "path": "textures/blocks/gold_ore"
    },
    {
      "name": "mc/blocks/grass_block_snow",
      "path": "textures/blocks/grass_block_snow"
    },
    {
      "name": "mc/blocks/grass_carried",
      "path": "textures/blocks/grass_carried"
    },
    {
      "name": "mc/blocks/grass_path_side",
      "path": "textures/blocks/grass_path_side"
    },
    {
      "name": "mc/blocks/grass_path_top",
      "path": "textures/blocks/grass_path_top"
    },
    {
      "name": "mc/blocks/grass_side_carried",
      "path": "textures/blocks/grass_side_carried"
    },
    {
      "name": "mc/blocks/grass_side_snowed",
      "path": "textures/blocks/grass_side_snowed"
    },
    {
      "name": "mc/blocks/grass_top",
      "path": "textures/blocks/grass_top"
    },
    {
      "name": "mc/blocks/gravel",
      "path": "textures/blocks/gravel"
    },
    {
      "name": "mc/blocks/hanging_roots",
      "path": "textures/blocks/hanging_roots"
    },
    {
      "name": "mc/blocks/hardened_clay",
      "path": "textures/blocks/hardened_clay"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_black",
      "path": "textures/blocks/hardened_clay_stained_black"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_blue",
      "path": "textures/blocks/hardened_clay_stained_blue"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_brown",
      "path": "textures/blocks/hardened_clay_stained_brown"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_cyan",
      "path": "textures/blocks/hardened_clay_stained_cyan"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_gray",
      "path": "textures/blocks/hardened_clay_stained_gray"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_green",
      "path": "textures/blocks/hardened_clay_stained_green"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_light_blue",
      "path": "textures/blocks/hardened_clay_stained_light_blue"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_lime",
      "path": "textures/blocks/hardened_clay_stained_lime"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_magenta",
      "path": "textures/blocks/hardened_clay_stained_magenta"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_orange",
      "path": "textures/blocks/hardened_clay_stained_orange"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_pink",
      "path": "textures/blocks/hardened_clay_stained_pink"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_purple",
      "path": "textures/blocks/hardened_clay_stained_purple"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_red",
      "path": "textures/blocks/hardened_clay_stained_red"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_silver",
      "path": "textures/blocks/hardened_clay_stained_silver"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_white",
      "path": "textures/blocks/hardened_clay_stained_white"
    },
    {
      "name": "mc/blocks/hardened_clay_stained_yellow",
      "path": "textures/blocks/hardened_clay_stained_yellow"
    },
    {
      "name": "mc/blocks/hay_block_side",
      "path": "textures/blocks/hay_block_side"
    },
    {
      "name": "mc/blocks/hay_block_top",
      "path": "textures/blocks/hay_block_top"
    },
    {
      "name": "mc/blocks/heartbreak_pottery_pattern",
      "path": "textures/blocks/heartbreak_pottery_pattern"
    },
    {
      "name": "mc/blocks/heart_pottery_pattern",
      "path": "textures/blocks/heart_pottery_pattern"
    },
    {
      "name": "mc/blocks/honeycomb",
      "path": "textures/blocks/honeycomb"
    },
    {
      "name": "mc/blocks/honey_bottom",
      "path": "textures/blocks/honey_bottom"
    },
    {
      "name": "mc/blocks/honey_side",
      "path": "textures/blocks/honey_side"
    },
    {
      "name": "mc/blocks/honey_top",
      "path": "textures/blocks/honey_top"
    },
    {
      "name": "mc/blocks/hopper_inside",
      "path": "textures/blocks/hopper_inside"
    },
    {
      "name": "mc/blocks/hopper_outside",
      "path": "textures/blocks/hopper_outside"
    },
    {
      "name": "mc/blocks/hopper_top",
      "path": "textures/blocks/hopper_top"
    },
    {
      "name": "mc/blocks/howl_pottery_pattern",
      "path": "textures/blocks/howl_pottery_pattern"
    },
    {
      "name": "mc/blocks/ice",
      "path": "textures/blocks/ice"
    },
    {
      "name": "mc/blocks/ice_packed",
      "path": "textures/blocks/ice_packed"
    },
    {
      "name": "mc/blocks/iron_bars",
      "path": "textures/blocks/iron_bars"
    },
    {
      "name": "mc/blocks/iron_block",
      "path": "textures/blocks/iron_block"
    },
    {
      "name": "mc/blocks/iron_ore",
      "path": "textures/blocks/iron_ore"
    },
    {
      "name": "mc/blocks/iron_trapdoor",
      "path": "textures/blocks/iron_trapdoor"
    },
    {
      "name": "mc/blocks/itemframe_background",
      "path": "textures/blocks/itemframe_background"
    },
    {
      "name": "mc/blocks/jigsaw_back",
      "path": "textures/blocks/jigsaw_back"
    },
    {
      "name": "mc/blocks/jigsaw_front",
      "path": "textures/blocks/jigsaw_front"
    },
    {
      "name": "mc/blocks/jigsaw_lock",
      "path": "textures/blocks/jigsaw_lock"
    },
    {
      "name": "mc/blocks/jigsaw_side",
      "path": "textures/blocks/jigsaw_side"
    },
    {
      "name": "mc/blocks/jukebox_side",
      "path": "textures/blocks/jukebox_side"
    },
    {
      "name": "mc/blocks/jukebox_top",
      "path": "textures/blocks/jukebox_top"
    },
    {
      "name": "mc/blocks/jungle_trapdoor",
      "path": "textures/blocks/jungle_trapdoor"
    },
    {
      "name": "mc/blocks/ladder",
      "path": "textures/blocks/ladder"
    },
    {
      "name": "mc/blocks/lantern",
      "path": "textures/blocks/lantern"
    },
    {
      "name": "mc/blocks/lapis_block",
      "path": "textures/blocks/lapis_block"
    },
    {
      "name": "mc/blocks/lapis_ore",
      "path": "textures/blocks/lapis_ore"
    },
    {
      "name": "mc/blocks/large_amethyst_bud",
      "path": "textures/blocks/large_amethyst_bud"
    },
    {
      "name": "mc/blocks/lava_flow",
      "path": "textures/blocks/lava_flow"
    },
    {
      "name": "mc/blocks/lava_placeholder",
      "path": "textures/blocks/lava_placeholder"
    },
    {
      "name": "mc/blocks/lava_still",
      "path": "textures/blocks/lava_still"
    },
    {
      "name": "mc/blocks/leaves_acacia_opaque",
      "path": "textures/blocks/leaves_acacia_opaque"
    },
    {
      "name": "mc/blocks/leaves_big_oak_opaque",
      "path": "textures/blocks/leaves_big_oak_opaque"
    },
    {
      "name": "mc/blocks/leaves_birch_opaque",
      "path": "textures/blocks/leaves_birch_opaque"
    },
    {
      "name": "mc/blocks/leaves_jungle_opaque",
      "path": "textures/blocks/leaves_jungle_opaque"
    },
    {
      "name": "mc/blocks/leaves_oak_opaque",
      "path": "textures/blocks/leaves_oak_opaque"
    },
    {
      "name": "mc/blocks/leaves_spruce_opaque",
      "path": "textures/blocks/leaves_spruce_opaque"
    },
    {
      "name": "mc/blocks/lectern_base",
      "path": "textures/blocks/lectern_base"
    },
    {
      "name": "mc/blocks/lectern_front",
      "path": "textures/blocks/lectern_front"
    },
    {
      "name": "mc/blocks/lectern_sides",
      "path": "textures/blocks/lectern_sides"
    },
    {
      "name": "mc/blocks/lectern_top",
      "path": "textures/blocks/lectern_top"
    },
    {
      "name": "mc/blocks/lever",
      "path": "textures/blocks/lever"
    },
    {
      "name": "mc/blocks/lightning_rod",
      "path": "textures/blocks/lightning_rod"
    },
    {
      "name": "mc/blocks/lodestone_side",
      "path": "textures/blocks/lodestone_side"
    },
    {
      "name": "mc/blocks/lodestone_top",
      "path": "textures/blocks/lodestone_top"
    },
    {
      "name": "mc/blocks/log_acacia",
      "path": "textures/blocks/log_acacia"
    },
    {
      "name": "mc/blocks/log_acacia_top",
      "path": "textures/blocks/log_acacia_top"
    },
    {
      "name": "mc/blocks/log_big_oak",
      "path": "textures/blocks/log_big_oak"
    },
    {
      "name": "mc/blocks/log_big_oak_top",
      "path": "textures/blocks/log_big_oak_top"
    },
    {
      "name": "mc/blocks/log_birch",
      "path": "textures/blocks/log_birch"
    },
    {
      "name": "mc/blocks/log_birch_top",
      "path": "textures/blocks/log_birch_top"
    },
    {
      "name": "mc/blocks/log_jungle",
      "path": "textures/blocks/log_jungle"
    },
    {
      "name": "mc/blocks/log_jungle_top",
      "path": "textures/blocks/log_jungle_top"
    },
    {
      "name": "mc/blocks/log_oak",
      "path": "textures/blocks/log_oak"
    },
    {
      "name": "mc/blocks/log_oak_top",
      "path": "textures/blocks/log_oak_top"
    },
    {
      "name": "mc/blocks/log_spruce",
      "path": "textures/blocks/log_spruce"
    },
    {
      "name": "mc/blocks/log_spruce_top",
      "path": "textures/blocks/log_spruce_top"
    },
    {
      "name": "mc/blocks/loom_bottom",
      "path": "textures/blocks/loom_bottom"
    },
    {
      "name": "mc/blocks/loom_front",
      "path": "textures/blocks/loom_front"
    },
    {
      "name": "mc/blocks/loom_side",
      "path": "textures/blocks/loom_side"
    },
    {
      "name": "mc/blocks/loom_top",
      "path": "textures/blocks/loom_top"
    },
    {
      "name": "mc/blocks/magma",
      "path": "textures/blocks/magma"
    },
    {
      "name": "mc/blocks/mangrove_door_bottom",
      "path": "textures/blocks/mangrove_door_bottom"
    },
    {
      "name": "mc/blocks/mangrove_door_top",
      "path": "textures/blocks/mangrove_door_top"
    },
    {
      "name": "mc/blocks/mangrove_log_side",
      "path": "textures/blocks/mangrove_log_side"
    },
    {
      "name": "mc/blocks/mangrove_log_top",
      "path": "textures/blocks/mangrove_log_top"
    },
    {
      "name": "mc/blocks/mangrove_planks",
      "path": "textures/blocks/mangrove_planks"
    },
    {
      "name": "mc/blocks/mangrove_propagule",
      "path": "textures/blocks/mangrove_propagule"
    },
    {
      "name": "mc/blocks/mangrove_propagule_hanging",
      "path": "textures/blocks/mangrove_propagule_hanging"
    },
    {
      "name": "mc/blocks/mangrove_roots_side",
      "path": "textures/blocks/mangrove_roots_side"
    },
    {
      "name": "mc/blocks/mangrove_roots_top",
      "path": "textures/blocks/mangrove_roots_top"
    },
    {
      "name": "mc/blocks/mangrove_trapdoor",
      "path": "textures/blocks/mangrove_trapdoor"
    },
    {
      "name": "mc/blocks/medium_amethyst_bud",
      "path": "textures/blocks/medium_amethyst_bud"
    },
    {
      "name": "mc/blocks/melon_side",
      "path": "textures/blocks/melon_side"
    },
    {
      "name": "mc/blocks/melon_stem_connected",
      "path": "textures/blocks/melon_stem_connected"
    },
    {
      "name": "mc/blocks/melon_stem_disconnected",
      "path": "textures/blocks/melon_stem_disconnected"
    },
    {
      "name": "mc/blocks/melon_top",
      "path": "textures/blocks/melon_top"
    },
    {
      "name": "mc/blocks/miner_pottery_pattern",
      "path": "textures/blocks/miner_pottery_pattern"
    },
    {
      "name": "mc/blocks/missing_tile",
      "path": "textures/blocks/missing_tile"
    },
    {
      "name": "mc/blocks/mob_spawner",
      "path": "textures/blocks/mob_spawner"
    },
    {
      "name": "mc/blocks/moss_block",
      "path": "textures/blocks/moss_block"
    },
    {
      "name": "mc/blocks/mourner_pottery_pattern",
      "path": "textures/blocks/mourner_pottery_pattern"
    },
    {
      "name": "mc/blocks/mud",
      "path": "textures/blocks/mud"
    },
    {
      "name": "mc/blocks/muddy_mangrove_roots_side",
      "path": "textures/blocks/muddy_mangrove_roots_side"
    },
    {
      "name": "mc/blocks/muddy_mangrove_roots_top",
      "path": "textures/blocks/muddy_mangrove_roots_top"
    },
    {
      "name": "mc/blocks/mud_bricks",
      "path": "textures/blocks/mud_bricks"
    },
    {
      "name": "mc/blocks/mushroom_block_inside",
      "path": "textures/blocks/mushroom_block_inside"
    },
    {
      "name": "mc/blocks/mushroom_block_skin_brown",
      "path": "textures/blocks/mushroom_block_skin_brown"
    },
    {
      "name": "mc/blocks/mushroom_block_skin_red",
      "path": "textures/blocks/mushroom_block_skin_red"
    },
    {
      "name": "mc/blocks/mushroom_block_skin_stem",
      "path": "textures/blocks/mushroom_block_skin_stem"
    },
    {
      "name": "mc/blocks/mushroom_brown",
      "path": "textures/blocks/mushroom_brown"
    },
    {
      "name": "mc/blocks/mushroom_red",
      "path": "textures/blocks/mushroom_red"
    },
    {
      "name": "mc/blocks/mycelium_side",
      "path": "textures/blocks/mycelium_side"
    },
    {
      "name": "mc/blocks/mycelium_top",
      "path": "textures/blocks/mycelium_top"
    },
    {
      "name": "mc/blocks/netherite_block",
      "path": "textures/blocks/netherite_block"
    },
    {
      "name": "mc/blocks/netherrack",
      "path": "textures/blocks/netherrack"
    },
    {
      "name": "mc/blocks/nether_brick",
      "path": "textures/blocks/nether_brick"
    },
    {
      "name": "mc/blocks/nether_gold_ore",
      "path": "textures/blocks/nether_gold_ore"
    },
    {
      "name": "mc/blocks/nether_sprouts",
      "path": "textures/blocks/nether_sprouts"
    },
    {
      "name": "mc/blocks/nether_wart_block",
      "path": "textures/blocks/nether_wart_block"
    },
    {
      "name": "mc/blocks/nether_wart_stage_0",
      "path": "textures/blocks/nether_wart_stage_0"
    },
    {
      "name": "mc/blocks/nether_wart_stage_1",
      "path": "textures/blocks/nether_wart_stage_1"
    },
    {
      "name": "mc/blocks/nether_wart_stage_2",
      "path": "textures/blocks/nether_wart_stage_2"
    },
    {
      "name": "mc/blocks/noteblock",
      "path": "textures/blocks/noteblock"
    },
    {
      "name": "mc/blocks/observer_back",
      "path": "textures/blocks/observer_back"
    },
    {
      "name": "mc/blocks/observer_back_lit",
      "path": "textures/blocks/observer_back_lit"
    },
    {
      "name": "mc/blocks/observer_front",
      "path": "textures/blocks/observer_front"
    },
    {
      "name": "mc/blocks/observer_side",
      "path": "textures/blocks/observer_side"
    },
    {
      "name": "mc/blocks/observer_top",
      "path": "textures/blocks/observer_top"
    },
    {
      "name": "mc/blocks/obsidian",
      "path": "textures/blocks/obsidian"
    },
    {
      "name": "mc/blocks/ochre_froglight_side",
      "path": "textures/blocks/ochre_froglight_side"
    },
    {
      "name": "mc/blocks/ochre_froglight_top",
      "path": "textures/blocks/ochre_froglight_top"
    },
    {
      "name": "mc/blocks/oxidized_copper",
      "path": "textures/blocks/oxidized_copper"
    },
    {
      "name": "mc/blocks/oxidized_cut_copper",
      "path": "textures/blocks/oxidized_cut_copper"
    },
    {
      "name": "mc/blocks/packed_mud",
      "path": "textures/blocks/packed_mud"
    },
    {
      "name": "mc/blocks/pearlescent_froglight_side",
      "path": "textures/blocks/pearlescent_froglight_side"
    },
    {
      "name": "mc/blocks/pearlescent_froglight_top",
      "path": "textures/blocks/pearlescent_froglight_top"
    },
    {
      "name": "mc/blocks/pink_petals",
      "path": "textures/blocks/pink_petals"
    },
    {
      "name": "mc/blocks/pink_petals_stem",
      "path": "textures/blocks/pink_petals_stem"
    },
    {
      "name": "mc/blocks/piston_bottom",
      "path": "textures/blocks/piston_bottom"
    },
    {
      "name": "mc/blocks/piston_inner",
      "path": "textures/blocks/piston_inner"
    },
    {
      "name": "mc/blocks/piston_side",
      "path": "textures/blocks/piston_side"
    },
    {
      "name": "mc/blocks/piston_top_normal",
      "path": "textures/blocks/piston_top_normal"
    },
    {
      "name": "mc/blocks/piston_top_sticky",
      "path": "textures/blocks/piston_top_sticky"
    },
    {
      "name": "mc/blocks/pitcher_crop_bottom",
      "path": "textures/blocks/pitcher_crop_bottom"
    },
    {
      "name": "mc/blocks/pitcher_crop_bottom_stage_1",
      "path": "textures/blocks/pitcher_crop_bottom_stage_1"
    },
    {
      "name": "mc/blocks/pitcher_crop_bottom_stage_2",
      "path": "textures/blocks/pitcher_crop_bottom_stage_2"
    },
    {
      "name": "mc/blocks/pitcher_crop_bottom_stage_3",
      "path": "textures/blocks/pitcher_crop_bottom_stage_3"
    },
    {
      "name": "mc/blocks/pitcher_crop_bottom_stage_4",
      "path": "textures/blocks/pitcher_crop_bottom_stage_4"
    },
    {
      "name": "mc/blocks/pitcher_crop_side",
      "path": "textures/blocks/pitcher_crop_side"
    },
    {
      "name": "mc/blocks/pitcher_crop_top",
      "path": "textures/blocks/pitcher_crop_top"
    },
    {
      "name": "mc/blocks/pitcher_crop_top_stage_3",
      "path": "textures/blocks/pitcher_crop_top_stage_3"
    },
    {
      "name": "mc/blocks/pitcher_crop_top_stage_4",
      "path": "textures/blocks/pitcher_crop_top_stage_4"
    },
    {
      "name": "mc/blocks/planks_acacia",
      "path": "textures/blocks/planks_acacia"
    },
    {
      "name": "mc/blocks/planks_big_oak",
      "path": "textures/blocks/planks_big_oak"
    },
    {
      "name": "mc/blocks/planks_birch",
      "path": "textures/blocks/planks_birch"
    },
    {
      "name": "mc/blocks/planks_jungle",
      "path": "textures/blocks/planks_jungle"
    },
    {
      "name": "mc/blocks/planks_oak",
      "path": "textures/blocks/planks_oak"
    },
    {
      "name": "mc/blocks/planks_spruce",
      "path": "textures/blocks/planks_spruce"
    },
    {
      "name": "mc/blocks/plenty_pottery_pattern",
      "path": "textures/blocks/plenty_pottery_pattern"
    },
    {
      "name": "mc/blocks/pointed_dripstone_down_base",
      "path": "textures/blocks/pointed_dripstone_down_base"
    },
    {
      "name": "mc/blocks/pointed_dripstone_down_frustum",
      "path": "textures/blocks/pointed_dripstone_down_frustum"
    },
    {
      "name": "mc/blocks/pointed_dripstone_down_merge",
      "path": "textures/blocks/pointed_dripstone_down_merge"
    },
    {
      "name": "mc/blocks/pointed_dripstone_down_middle",
      "path": "textures/blocks/pointed_dripstone_down_middle"
    },
    {
      "name": "mc/blocks/pointed_dripstone_down_tip",
      "path": "textures/blocks/pointed_dripstone_down_tip"
    },
    {
      "name": "mc/blocks/pointed_dripstone_up_base",
      "path": "textures/blocks/pointed_dripstone_up_base"
    },
    {
      "name": "mc/blocks/pointed_dripstone_up_frustum",
      "path": "textures/blocks/pointed_dripstone_up_frustum"
    },
    {
      "name": "mc/blocks/pointed_dripstone_up_merge",
      "path": "textures/blocks/pointed_dripstone_up_merge"
    },
    {
      "name": "mc/blocks/pointed_dripstone_up_middle",
      "path": "textures/blocks/pointed_dripstone_up_middle"
    },
    {
      "name": "mc/blocks/pointed_dripstone_up_tip",
      "path": "textures/blocks/pointed_dripstone_up_tip"
    },
    {
      "name": "mc/blocks/polished_basalt_side",
      "path": "textures/blocks/polished_basalt_side"
    },
    {
      "name": "mc/blocks/polished_basalt_top",
      "path": "textures/blocks/polished_basalt_top"
    },
    {
      "name": "mc/blocks/polished_blackstone",
      "path": "textures/blocks/polished_blackstone"
    },
    {
      "name": "mc/blocks/polished_blackstone_bricks",
      "path": "textures/blocks/polished_blackstone_bricks"
    },
    {
      "name": "mc/blocks/portal",
      "path": "textures/blocks/portal"
    },
    {
      "name": "mc/blocks/portal_placeholder",
      "path": "textures/blocks/portal_placeholder"
    },
    {
      "name": "mc/blocks/potatoes_stage_0",
      "path": "textures/blocks/potatoes_stage_0"
    },
    {
      "name": "mc/blocks/potatoes_stage_1",
      "path": "textures/blocks/potatoes_stage_1"
    },
    {
      "name": "mc/blocks/potatoes_stage_2",
      "path": "textures/blocks/potatoes_stage_2"
    },
    {
      "name": "mc/blocks/potatoes_stage_3",
      "path": "textures/blocks/potatoes_stage_3"
    },
    {
      "name": "mc/blocks/potted_azalea_bush_plant",
      "path": "textures/blocks/potted_azalea_bush_plant"
    },
    {
      "name": "mc/blocks/potted_azalea_bush_side",
      "path": "textures/blocks/potted_azalea_bush_side"
    },
    {
      "name": "mc/blocks/potted_azalea_bush_top",
      "path": "textures/blocks/potted_azalea_bush_top"
    },
    {
      "name": "mc/blocks/potted_flowering_azalea_bush_plant",
      "path": "textures/blocks/potted_flowering_azalea_bush_plant"
    },
    {
      "name": "mc/blocks/potted_flowering_azalea_bush_side",
      "path": "textures/blocks/potted_flowering_azalea_bush_side"
    },
    {
      "name": "mc/blocks/potted_flowering_azalea_bush_top",
      "path": "textures/blocks/potted_flowering_azalea_bush_top"
    },
    {
      "name": "mc/blocks/powder_snow",
      "path": "textures/blocks/powder_snow"
    },
    {
      "name": "mc/blocks/prismarine_bricks",
      "path": "textures/blocks/prismarine_bricks"
    },
    {
      "name": "mc/blocks/prismarine_dark",
      "path": "textures/blocks/prismarine_dark"
    },
    {
      "name": "mc/blocks/prismarine_rough",
      "path": "textures/blocks/prismarine_rough"
    },
    {
      "name": "mc/blocks/prize_pottery_pattern",
      "path": "textures/blocks/prize_pottery_pattern"
    },
    {
      "name": "mc/blocks/pumpkin_face_off",
      "path": "textures/blocks/pumpkin_face_off"
    },
    {
      "name": "mc/blocks/pumpkin_face_on",
      "path": "textures/blocks/pumpkin_face_on"
    },
    {
      "name": "mc/blocks/pumpkin_side",
      "path": "textures/blocks/pumpkin_side"
    },
    {
      "name": "mc/blocks/pumpkin_stem_connected",
      "path": "textures/blocks/pumpkin_stem_connected"
    },
    {
      "name": "mc/blocks/pumpkin_stem_disconnected",
      "path": "textures/blocks/pumpkin_stem_disconnected"
    },
    {
      "name": "mc/blocks/pumpkin_top",
      "path": "textures/blocks/pumpkin_top"
    },
    {
      "name": "mc/blocks/purpur_block",
      "path": "textures/blocks/purpur_block"
    },
    {
      "name": "mc/blocks/purpur_pillar",
      "path": "textures/blocks/purpur_pillar"
    },
    {
      "name": "mc/blocks/purpur_pillar_top",
      "path": "textures/blocks/purpur_pillar_top"
    },
    {
      "name": "mc/blocks/quartz_block_bottom",
      "path": "textures/blocks/quartz_block_bottom"
    },
    {
      "name": "mc/blocks/quartz_block_chiseled",
      "path": "textures/blocks/quartz_block_chiseled"
    },
    {
      "name": "mc/blocks/quartz_block_chiseled_top",
      "path": "textures/blocks/quartz_block_chiseled_top"
    },
    {
      "name": "mc/blocks/quartz_block_lines",
      "path": "textures/blocks/quartz_block_lines"
    },
    {
      "name": "mc/blocks/quartz_block_lines_top",
      "path": "textures/blocks/quartz_block_lines_top"
    },
    {
      "name": "mc/blocks/quartz_block_side",
      "path": "textures/blocks/quartz_block_side"
    },
    {
      "name": "mc/blocks/quartz_block_top",
      "path": "textures/blocks/quartz_block_top"
    },
    {
      "name": "mc/blocks/quartz_bricks",
      "path": "textures/blocks/quartz_bricks"
    },
    {
      "name": "mc/blocks/quartz_ore",
      "path": "textures/blocks/quartz_ore"
    },
    {
      "name": "mc/blocks/rail_activator",
      "path": "textures/blocks/rail_activator"
    },
    {
      "name": "mc/blocks/rail_activator_powered",
      "path": "textures/blocks/rail_activator_powered"
    },
    {
      "name": "mc/blocks/rail_detector",
      "path": "textures/blocks/rail_detector"
    },
    {
      "name": "mc/blocks/rail_detector_powered",
      "path": "textures/blocks/rail_detector_powered"
    },
    {
      "name": "mc/blocks/rail_golden",
      "path": "textures/blocks/rail_golden"
    },
    {
      "name": "mc/blocks/rail_golden_powered",
      "path": "textures/blocks/rail_golden_powered"
    },
    {
      "name": "mc/blocks/rail_normal",
      "path": "textures/blocks/rail_normal"
    },
    {
      "name": "mc/blocks/rail_normal_turned",
      "path": "textures/blocks/rail_normal_turned"
    },
    {
      "name": "mc/blocks/raw_copper_block",
      "path": "textures/blocks/raw_copper_block"
    },
    {
      "name": "mc/blocks/raw_gold_block",
      "path": "textures/blocks/raw_gold_block"
    },
    {
      "name": "mc/blocks/raw_iron_block",
      "path": "textures/blocks/raw_iron_block"
    },
    {
      "name": "mc/blocks/reactor_core_stage_0",
      "path": "textures/blocks/reactor_core_stage_0"
    },
    {
      "name": "mc/blocks/reactor_core_stage_1",
      "path": "textures/blocks/reactor_core_stage_1"
    },
    {
      "name": "mc/blocks/reactor_core_stage_2",
      "path": "textures/blocks/reactor_core_stage_2"
    },
    {
      "name": "mc/blocks/redstone_block",
      "path": "textures/blocks/redstone_block"
    },
    {
      "name": "mc/blocks/redstone_dust_cross",
      "path": "textures/blocks/redstone_dust_cross"
    },
    {
      "name": "mc/blocks/redstone_dust_line",
      "path": "textures/blocks/redstone_dust_line"
    },
    {
      "name": "mc/blocks/redstone_lamp_off",
      "path": "textures/blocks/redstone_lamp_off"
    },
    {
      "name": "mc/blocks/redstone_lamp_on",
      "path": "textures/blocks/redstone_lamp_on"
    },
    {
      "name": "mc/blocks/redstone_ore",
      "path": "textures/blocks/redstone_ore"
    },
    {
      "name": "mc/blocks/redstone_torch_off",
      "path": "textures/blocks/redstone_torch_off"
    },
    {
      "name": "mc/blocks/redstone_torch_on",
      "path": "textures/blocks/redstone_torch_on"
    },
    {
      "name": "mc/blocks/red_nether_brick",
      "path": "textures/blocks/red_nether_brick"
    },
    {
      "name": "mc/blocks/red_sand",
      "path": "textures/blocks/red_sand"
    },
    {
      "name": "mc/blocks/red_sandstone_bottom",
      "path": "textures/blocks/red_sandstone_bottom"
    },
    {
      "name": "mc/blocks/red_sandstone_carved",
      "path": "textures/blocks/red_sandstone_carved"
    },
    {
      "name": "mc/blocks/red_sandstone_normal",
      "path": "textures/blocks/red_sandstone_normal"
    },
    {
      "name": "mc/blocks/red_sandstone_smooth",
      "path": "textures/blocks/red_sandstone_smooth"
    },
    {
      "name": "mc/blocks/red_sandstone_top",
      "path": "textures/blocks/red_sandstone_top"
    },
    {
      "name": "mc/blocks/reinforced_deepslate_bottom",
      "path": "textures/blocks/reinforced_deepslate_bottom"
    },
    {
      "name": "mc/blocks/reinforced_deepslate_side",
      "path": "textures/blocks/reinforced_deepslate_side"
    },
    {
      "name": "mc/blocks/reinforced_deepslate_top",
      "path": "textures/blocks/reinforced_deepslate_top"
    },
    {
      "name": "mc/blocks/repeater_off",
      "path": "textures/blocks/repeater_off"
    },
    {
      "name": "mc/blocks/repeater_on",
      "path": "textures/blocks/repeater_on"
    },
    {
      "name": "mc/blocks/repeating_command_block_back",
      "path": "textures/blocks/repeating_command_block_back"
    },
    {
      "name": "mc/blocks/repeating_command_block_back_mipmap",
      "path": "textures/blocks/repeating_command_block_back_mipmap"
    },
    {
      "name": "mc/blocks/repeating_command_block_conditional",
      "path": "textures/blocks/repeating_command_block_conditional"
    },
    {
      "name": "mc/blocks/repeating_command_block_conditional_mipmap",
      "path": "textures/blocks/repeating_command_block_conditional_mipmap"
    },
    {
      "name": "mc/blocks/repeating_command_block_front",
      "path": "textures/blocks/repeating_command_block_front"
    },
    {
      "name": "mc/blocks/repeating_command_block_front_mipmap",
      "path": "textures/blocks/repeating_command_block_front_mipmap"
    },
    {
      "name": "mc/blocks/repeating_command_block_side",
      "path": "textures/blocks/repeating_command_block_side"
    },
    {
      "name": "mc/blocks/repeating_command_block_side_mipmap",
      "path": "textures/blocks/repeating_command_block_side_mipmap"
    },
    {
      "name": "mc/blocks/respawn_anchor_bottom",
      "path": "textures/blocks/respawn_anchor_bottom"
    },
    {
      "name": "mc/blocks/respawn_anchor_side0",
      "path": "textures/blocks/respawn_anchor_side0"
    },
    {
      "name": "mc/blocks/respawn_anchor_side1",
      "path": "textures/blocks/respawn_anchor_side1"
    },
    {
      "name": "mc/blocks/respawn_anchor_side2",
      "path": "textures/blocks/respawn_anchor_side2"
    },
    {
      "name": "mc/blocks/respawn_anchor_side3",
      "path": "textures/blocks/respawn_anchor_side3"
    },
    {
      "name": "mc/blocks/respawn_anchor_side4",
      "path": "textures/blocks/respawn_anchor_side4"
    },
    {
      "name": "mc/blocks/respawn_anchor_top",
      "path": "textures/blocks/respawn_anchor_top"
    },
    {
      "name": "mc/blocks/respawn_anchor_top_off",
      "path": "textures/blocks/respawn_anchor_top_off"
    },
    {
      "name": "mc/blocks/sand",
      "path": "textures/blocks/sand"
    },
    {
      "name": "mc/blocks/sandstone_bottom",
      "path": "textures/blocks/sandstone_bottom"
    },
    {
      "name": "mc/blocks/sandstone_carved",
      "path": "textures/blocks/sandstone_carved"
    },
    {
      "name": "mc/blocks/sandstone_normal",
      "path": "textures/blocks/sandstone_normal"
    },
    {
      "name": "mc/blocks/sandstone_smooth",
      "path": "textures/blocks/sandstone_smooth"
    },
    {
      "name": "mc/blocks/sandstone_top",
      "path": "textures/blocks/sandstone_top"
    },
    {
      "name": "mc/blocks/sapling_acacia",
      "path": "textures/blocks/sapling_acacia"
    },
    {
      "name": "mc/blocks/sapling_birch",
      "path": "textures/blocks/sapling_birch"
    },
    {
      "name": "mc/blocks/sapling_jungle",
      "path": "textures/blocks/sapling_jungle"
    },
    {
      "name": "mc/blocks/sapling_oak",
      "path": "textures/blocks/sapling_oak"
    },
    {
      "name": "mc/blocks/sapling_roofed_oak",
      "path": "textures/blocks/sapling_roofed_oak"
    },
    {
      "name": "mc/blocks/sapling_spruce",
      "path": "textures/blocks/sapling_spruce"
    },
    {
      "name": "mc/blocks/sculk",
      "path": "textures/blocks/sculk"
    },
    {
      "name": "mc/blocks/sculk_catalyst_bottom",
      "path": "textures/blocks/sculk_catalyst_bottom"
    },
    {
      "name": "mc/blocks/sculk_catalyst_side",
      "path": "textures/blocks/sculk_catalyst_side"
    },
    {
      "name": "mc/blocks/sculk_catalyst_side_bloom",
      "path": "textures/blocks/sculk_catalyst_side_bloom"
    },
    {
      "name": "mc/blocks/sculk_catalyst_top",
      "path": "textures/blocks/sculk_catalyst_top"
    },
    {
      "name": "mc/blocks/sculk_catalyst_top_bloom",
      "path": "textures/blocks/sculk_catalyst_top_bloom"
    },
    {
      "name": "mc/blocks/sculk_sensor_bottom",
      "path": "textures/blocks/sculk_sensor_bottom"
    },
    {
      "name": "mc/blocks/sculk_sensor_side",
      "path": "textures/blocks/sculk_sensor_side"
    },
    {
      "name": "mc/blocks/sculk_sensor_tendril_active",
      "path": "textures/blocks/sculk_sensor_tendril_active"
    },
    {
      "name": "mc/blocks/sculk_sensor_tendril_inactive",
      "path": "textures/blocks/sculk_sensor_tendril_inactive"
    },
    {
      "name": "mc/blocks/sculk_sensor_top",
      "path": "textures/blocks/sculk_sensor_top"
    },
    {
      "name": "mc/blocks/sculk_shrieker_bottom",
      "path": "textures/blocks/sculk_shrieker_bottom"
    },
    {
      "name": "mc/blocks/sculk_shrieker_can_summon_inner_top",
      "path": "textures/blocks/sculk_shrieker_can_summon_inner_top"
    },
    {
      "name": "mc/blocks/sculk_shrieker_inner_top",
      "path": "textures/blocks/sculk_shrieker_inner_top"
    },
    {
      "name": "mc/blocks/sculk_shrieker_side",
      "path": "textures/blocks/sculk_shrieker_side"
    },
    {
      "name": "mc/blocks/sculk_shrieker_top",
      "path": "textures/blocks/sculk_shrieker_top"
    },
    {
      "name": "mc/blocks/sculk_vein",
      "path": "textures/blocks/sculk_vein"
    },
    {
      "name": "mc/blocks/seagrass",
      "path": "textures/blocks/seagrass"
    },
    {
      "name": "mc/blocks/seagrass_carried",
      "path": "textures/blocks/seagrass_carried"
    },
    {
      "name": "mc/blocks/sea_lantern",
      "path": "textures/blocks/sea_lantern"
    },
    {
      "name": "mc/blocks/sea_pickle",
      "path": "textures/blocks/sea_pickle"
    },
    {
      "name": "mc/blocks/sheaf_pottery_pattern",
      "path": "textures/blocks/sheaf_pottery_pattern"
    },
    {
      "name": "mc/blocks/shelter_pottery_pattern",
      "path": "textures/blocks/shelter_pottery_pattern"
    },
    {
      "name": "mc/blocks/shroomlight",
      "path": "textures/blocks/shroomlight"
    },
    {
      "name": "mc/blocks/shulker_top_black",
      "path": "textures/blocks/shulker_top_black"
    },
    {
      "name": "mc/blocks/shulker_top_blue",
      "path": "textures/blocks/shulker_top_blue"
    },
    {
      "name": "mc/blocks/shulker_top_brown",
      "path": "textures/blocks/shulker_top_brown"
    },
    {
      "name": "mc/blocks/shulker_top_cyan",
      "path": "textures/blocks/shulker_top_cyan"
    },
    {
      "name": "mc/blocks/shulker_top_gray",
      "path": "textures/blocks/shulker_top_gray"
    },
    {
      "name": "mc/blocks/shulker_top_green",
      "path": "textures/blocks/shulker_top_green"
    },
    {
      "name": "mc/blocks/shulker_top_light_blue",
      "path": "textures/blocks/shulker_top_light_blue"
    },
    {
      "name": "mc/blocks/shulker_top_lime",
      "path": "textures/blocks/shulker_top_lime"
    },
    {
      "name": "mc/blocks/shulker_top_magenta",
      "path": "textures/blocks/shulker_top_magenta"
    },
    {
      "name": "mc/blocks/shulker_top_orange",
      "path": "textures/blocks/shulker_top_orange"
    },
    {
      "name": "mc/blocks/shulker_top_pink",
      "path": "textures/blocks/shulker_top_pink"
    },
    {
      "name": "mc/blocks/shulker_top_purple",
      "path": "textures/blocks/shulker_top_purple"
    },
    {
      "name": "mc/blocks/shulker_top_red",
      "path": "textures/blocks/shulker_top_red"
    },
    {
      "name": "mc/blocks/shulker_top_silver",
      "path": "textures/blocks/shulker_top_silver"
    },
    {
      "name": "mc/blocks/shulker_top_undyed",
      "path": "textures/blocks/shulker_top_undyed"
    },
    {
      "name": "mc/blocks/shulker_top_white",
      "path": "textures/blocks/shulker_top_white"
    },
    {
      "name": "mc/blocks/shulker_top_yellow",
      "path": "textures/blocks/shulker_top_yellow"
    },
    {
      "name": "mc/blocks/skull_pottery_pattern",
      "path": "textures/blocks/skull_pottery_pattern"
    },
    {
      "name": "mc/blocks/slime",
      "path": "textures/blocks/slime"
    },
    {
      "name": "mc/blocks/small_amethyst_bud",
      "path": "textures/blocks/small_amethyst_bud"
    },
    {
      "name": "mc/blocks/small_dripleaf_side",
      "path": "textures/blocks/small_dripleaf_side"
    },
    {
      "name": "mc/blocks/small_dripleaf_stem_bottom",
      "path": "textures/blocks/small_dripleaf_stem_bottom"
    },
    {
      "name": "mc/blocks/small_dripleaf_stem_top",
      "path": "textures/blocks/small_dripleaf_stem_top"
    },
    {
      "name": "mc/blocks/small_dripleaf_top",
      "path": "textures/blocks/small_dripleaf_top"
    },
    {
      "name": "mc/blocks/smithing_table_bottom",
      "path": "textures/blocks/smithing_table_bottom"
    },
    {
      "name": "mc/blocks/smithing_table_front",
      "path": "textures/blocks/smithing_table_front"
    },
    {
      "name": "mc/blocks/smithing_table_side",
      "path": "textures/blocks/smithing_table_side"
    },
    {
      "name": "mc/blocks/smithing_table_top",
      "path": "textures/blocks/smithing_table_top"
    },
    {
      "name": "mc/blocks/smoker_bottom",
      "path": "textures/blocks/smoker_bottom"
    },
    {
      "name": "mc/blocks/smoker_front_off",
      "path": "textures/blocks/smoker_front_off"
    },
    {
      "name": "mc/blocks/smoker_front_on",
      "path": "textures/blocks/smoker_front_on"
    },
    {
      "name": "mc/blocks/smoker_side",
      "path": "textures/blocks/smoker_side"
    },
    {
      "name": "mc/blocks/smoker_top",
      "path": "textures/blocks/smoker_top"
    },
    {
      "name": "mc/blocks/smooth_basalt",
      "path": "textures/blocks/smooth_basalt"
    },
    {
      "name": "mc/blocks/sniffer_egg_not_cracked_bottom",
      "path": "textures/blocks/sniffer_egg_not_cracked_bottom"
    },
    {
      "name": "mc/blocks/sniffer_egg_not_cracked_east",
      "path": "textures/blocks/sniffer_egg_not_cracked_east"
    },
    {
      "name": "mc/blocks/sniffer_egg_not_cracked_north",
      "path": "textures/blocks/sniffer_egg_not_cracked_north"
    },
    {
      "name": "mc/blocks/sniffer_egg_not_cracked_south",
      "path": "textures/blocks/sniffer_egg_not_cracked_south"
    },
    {
      "name": "mc/blocks/sniffer_egg_not_cracked_top",
      "path": "textures/blocks/sniffer_egg_not_cracked_top"
    },
    {
      "name": "mc/blocks/sniffer_egg_not_cracked_west",
      "path": "textures/blocks/sniffer_egg_not_cracked_west"
    },
    {
      "name": "mc/blocks/sniffer_egg_slightly_cracked_bottom",
      "path": "textures/blocks/sniffer_egg_slightly_cracked_bottom"
    },
    {
      "name": "mc/blocks/sniffer_egg_slightly_cracked_east",
      "path": "textures/blocks/sniffer_egg_slightly_cracked_east"
    },
    {
      "name": "mc/blocks/sniffer_egg_slightly_cracked_north",
      "path": "textures/blocks/sniffer_egg_slightly_cracked_north"
    },
    {
      "name": "mc/blocks/sniffer_egg_slightly_cracked_south",
      "path": "textures/blocks/sniffer_egg_slightly_cracked_south"
    },
    {
      "name": "mc/blocks/sniffer_egg_slightly_cracked_top",
      "path": "textures/blocks/sniffer_egg_slightly_cracked_top"
    },
    {
      "name": "mc/blocks/sniffer_egg_slightly_cracked_west",
      "path": "textures/blocks/sniffer_egg_slightly_cracked_west"
    },
    {
      "name": "mc/blocks/sniffer_egg_very_cracked_bottom",
      "path": "textures/blocks/sniffer_egg_very_cracked_bottom"
    },
    {
      "name": "mc/blocks/sniffer_egg_very_cracked_east",
      "path": "textures/blocks/sniffer_egg_very_cracked_east"
    },
    {
      "name": "mc/blocks/sniffer_egg_very_cracked_north",
      "path": "textures/blocks/sniffer_egg_very_cracked_north"
    },
    {
      "name": "mc/blocks/sniffer_egg_very_cracked_south",
      "path": "textures/blocks/sniffer_egg_very_cracked_south"
    },
    {
      "name": "mc/blocks/sniffer_egg_very_cracked_top",
      "path": "textures/blocks/sniffer_egg_very_cracked_top"
    },
    {
      "name": "mc/blocks/sniffer_egg_very_cracked_west",
      "path": "textures/blocks/sniffer_egg_very_cracked_west"
    },
    {
      "name": "mc/blocks/snort_pottery_pattern",
      "path": "textures/blocks/snort_pottery_pattern"
    },
    {
      "name": "mc/blocks/snow",
      "path": "textures/blocks/snow"
    },
    {
      "name": "mc/blocks/soul_campfire",
      "path": "textures/blocks/soul_campfire"
    },
    {
      "name": "mc/blocks/soul_campfire_log_lit",
      "path": "textures/blocks/soul_campfire_log_lit"
    },
    {
      "name": "mc/blocks/soul_fire_0",
      "path": "textures/blocks/soul_fire_0"
    },
    {
      "name": "mc/blocks/soul_fire_1",
      "path": "textures/blocks/soul_fire_1"
    },
    {
      "name": "mc/blocks/soul_lantern",
      "path": "textures/blocks/soul_lantern"
    },
    {
      "name": "mc/blocks/soul_sand",
      "path": "textures/blocks/soul_sand"
    },
    {
      "name": "mc/blocks/soul_soil",
      "path": "textures/blocks/soul_soil"
    },
    {
      "name": "mc/blocks/soul_torch",
      "path": "textures/blocks/soul_torch"
    },
    {
      "name": "mc/blocks/sponge",
      "path": "textures/blocks/sponge"
    },
    {
      "name": "mc/blocks/sponge_wet",
      "path": "textures/blocks/sponge_wet"
    },
    {
      "name": "mc/blocks/spore_blossom",
      "path": "textures/blocks/spore_blossom"
    },
    {
      "name": "mc/blocks/spore_blossom_base",
      "path": "textures/blocks/spore_blossom_base"
    },
    {
      "name": "mc/blocks/spruce_trapdoor",
      "path": "textures/blocks/spruce_trapdoor"
    },
    {
      "name": "mc/blocks/stone",
      "path": "textures/blocks/stone"
    },
    {
      "name": "mc/blocks/stonebrick",
      "path": "textures/blocks/stonebrick"
    },
    {
      "name": "mc/blocks/stonebrick_carved",
      "path": "textures/blocks/stonebrick_carved"
    },
    {
      "name": "mc/blocks/stonebrick_cracked",
      "path": "textures/blocks/stonebrick_cracked"
    },
    {
      "name": "mc/blocks/stonebrick_mossy",
      "path": "textures/blocks/stonebrick_mossy"
    },
    {
      "name": "mc/blocks/stonecutter2_bottom",
      "path": "textures/blocks/stonecutter2_bottom"
    },
    {
      "name": "mc/blocks/stonecutter2_side",
      "path": "textures/blocks/stonecutter2_side"
    },
    {
      "name": "mc/blocks/stonecutter2_top",
      "path": "textures/blocks/stonecutter2_top"
    },
    {
      "name": "mc/blocks/stonecutter_bottom",
      "path": "textures/blocks/stonecutter_bottom"
    },
    {
      "name": "mc/blocks/stonecutter_other_side",
      "path": "textures/blocks/stonecutter_other_side"
    },
    {
      "name": "mc/blocks/stonecutter_side",
      "path": "textures/blocks/stonecutter_side"
    },
    {
      "name": "mc/blocks/stonecutter_top",
      "path": "textures/blocks/stonecutter_top"
    },
    {
      "name": "mc/blocks/stone_andesite",
      "path": "textures/blocks/stone_andesite"
    },
    {
      "name": "mc/blocks/stone_andesite_smooth",
      "path": "textures/blocks/stone_andesite_smooth"
    },
    {
      "name": "mc/blocks/stone_diorite",
      "path": "textures/blocks/stone_diorite"
    },
    {
      "name": "mc/blocks/stone_diorite_smooth",
      "path": "textures/blocks/stone_diorite_smooth"
    },
    {
      "name": "mc/blocks/stone_granite",
      "path": "textures/blocks/stone_granite"
    },
    {
      "name": "mc/blocks/stone_granite_smooth",
      "path": "textures/blocks/stone_granite_smooth"
    },
    {
      "name": "mc/blocks/stone_slab_side",
      "path": "textures/blocks/stone_slab_side"
    },
    {
      "name": "mc/blocks/stone_slab_top",
      "path": "textures/blocks/stone_slab_top"
    },
    {
      "name": "mc/blocks/stripped_acacia_log",
      "path": "textures/blocks/stripped_acacia_log"
    },
    {
      "name": "mc/blocks/stripped_acacia_log_top",
      "path": "textures/blocks/stripped_acacia_log_top"
    },
    {
      "name": "mc/blocks/stripped_bamboo_block",
      "path": "textures/blocks/stripped_bamboo_block"
    },
    {
      "name": "mc/blocks/stripped_bamboo_block_top",
      "path": "textures/blocks/stripped_bamboo_block_top"
    },
    {
      "name": "mc/blocks/stripped_birch_log",
      "path": "textures/blocks/stripped_birch_log"
    },
    {
      "name": "mc/blocks/stripped_birch_log_top",
      "path": "textures/blocks/stripped_birch_log_top"
    },
    {
      "name": "mc/blocks/stripped_cherry_log_side",
      "path": "textures/blocks/stripped_cherry_log_side"
    },
    {
      "name": "mc/blocks/stripped_cherry_log_top",
      "path": "textures/blocks/stripped_cherry_log_top"
    },
    {
      "name": "mc/blocks/stripped_dark_oak_log",
      "path": "textures/blocks/stripped_dark_oak_log"
    },
    {
      "name": "mc/blocks/stripped_dark_oak_log_top",
      "path": "textures/blocks/stripped_dark_oak_log_top"
    },
    {
      "name": "mc/blocks/stripped_jungle_log",
      "path": "textures/blocks/stripped_jungle_log"
    },
    {
      "name": "mc/blocks/stripped_jungle_log_top",
      "path": "textures/blocks/stripped_jungle_log_top"
    },
    {
      "name": "mc/blocks/stripped_mangrove_log_side",
      "path": "textures/blocks/stripped_mangrove_log_side"
    },
    {
      "name": "mc/blocks/stripped_mangrove_log_top",
      "path": "textures/blocks/stripped_mangrove_log_top"
    },
    {
      "name": "mc/blocks/stripped_oak_log",
      "path": "textures/blocks/stripped_oak_log"
    },
    {
      "name": "mc/blocks/stripped_oak_log_top",
      "path": "textures/blocks/stripped_oak_log_top"
    },
    {
      "name": "mc/blocks/stripped_spruce_log",
      "path": "textures/blocks/stripped_spruce_log"
    },
    {
      "name": "mc/blocks/stripped_spruce_log_top",
      "path": "textures/blocks/stripped_spruce_log_top"
    },
    {
      "name": "mc/blocks/structure_air",
      "path": "textures/blocks/structure_air"
    },
    {
      "name": "mc/blocks/structure_block",
      "path": "textures/blocks/structure_block"
    },
    {
      "name": "mc/blocks/structure_block_corner",
      "path": "textures/blocks/structure_block_corner"
    },
    {
      "name": "mc/blocks/structure_block_data",
      "path": "textures/blocks/structure_block_data"
    },
    {
      "name": "mc/blocks/structure_block_export",
      "path": "textures/blocks/structure_block_export"
    },
    {
      "name": "mc/blocks/structure_block_load",
      "path": "textures/blocks/structure_block_load"
    },
    {
      "name": "mc/blocks/structure_block_save",
      "path": "textures/blocks/structure_block_save"
    },
    {
      "name": "mc/blocks/structure_void",
      "path": "textures/blocks/structure_void"
    },
    {
      "name": "mc/blocks/suspicious_gravel_0",
      "path": "textures/blocks/suspicious_gravel_0"
    },
    {
      "name": "mc/blocks/suspicious_gravel_1",
      "path": "textures/blocks/suspicious_gravel_1"
    },
    {
      "name": "mc/blocks/suspicious_gravel_2",
      "path": "textures/blocks/suspicious_gravel_2"
    },
    {
      "name": "mc/blocks/suspicious_gravel_3",
      "path": "textures/blocks/suspicious_gravel_3"
    },
    {
      "name": "mc/blocks/suspicious_sand_0",
      "path": "textures/blocks/suspicious_sand_0"
    },
    {
      "name": "mc/blocks/suspicious_sand_1",
      "path": "textures/blocks/suspicious_sand_1"
    },
    {
      "name": "mc/blocks/suspicious_sand_2",
      "path": "textures/blocks/suspicious_sand_2"
    },
    {
      "name": "mc/blocks/suspicious_sand_3",
      "path": "textures/blocks/suspicious_sand_3"
    },
    {
      "name": "mc/blocks/sweet_berry_bush_stage0",
      "path": "textures/blocks/sweet_berry_bush_stage0"
    },
    {
      "name": "mc/blocks/sweet_berry_bush_stage1",
      "path": "textures/blocks/sweet_berry_bush_stage1"
    },
    {
      "name": "mc/blocks/sweet_berry_bush_stage2",
      "path": "textures/blocks/sweet_berry_bush_stage2"
    },
    {
      "name": "mc/blocks/sweet_berry_bush_stage3",
      "path": "textures/blocks/sweet_berry_bush_stage3"
    },
    {
      "name": "mc/blocks/tallgrass",
      "path": "textures/blocks/tallgrass"
    },
    {
      "name": "mc/blocks/target_side",
      "path": "textures/blocks/target_side"
    },
    {
      "name": "mc/blocks/target_top",
      "path": "textures/blocks/target_top"
    },
    {
      "name": "mc/blocks/tinted_glass",
      "path": "textures/blocks/tinted_glass"
    },
    {
      "name": "mc/blocks/tnt_bottom",
      "path": "textures/blocks/tnt_bottom"
    },
    {
      "name": "mc/blocks/tnt_side",
      "path": "textures/blocks/tnt_side"
    },
    {
      "name": "mc/blocks/tnt_top",
      "path": "textures/blocks/tnt_top"
    },
    {
      "name": "mc/blocks/torchflower",
      "path": "textures/blocks/torchflower"
    },
    {
      "name": "mc/blocks/torchflower_crop_stage_0",
      "path": "textures/blocks/torchflower_crop_stage_0"
    },
    {
      "name": "mc/blocks/torchflower_crop_stage_1",
      "path": "textures/blocks/torchflower_crop_stage_1"
    },
    {
      "name": "mc/blocks/torch_on",
      "path": "textures/blocks/torch_on"
    },
    {
      "name": "mc/blocks/trapdoor",
      "path": "textures/blocks/trapdoor"
    },
    {
      "name": "mc/blocks/trapped_chest_front",
      "path": "textures/blocks/trapped_chest_front"
    },
    {
      "name": "mc/blocks/trip_wire",
      "path": "textures/blocks/trip_wire"
    },
    {
      "name": "mc/blocks/trip_wire_source",
      "path": "textures/blocks/trip_wire_source"
    },
    {
      "name": "mc/blocks/tuff",
      "path": "textures/blocks/tuff"
    },
    {
      "name": "mc/blocks/turtle_egg_not_cracked",
      "path": "textures/blocks/turtle_egg_not_cracked"
    },
    {
      "name": "mc/blocks/turtle_egg_slightly_cracked",
      "path": "textures/blocks/turtle_egg_slightly_cracked"
    },
    {
      "name": "mc/blocks/turtle_egg_very_cracked",
      "path": "textures/blocks/turtle_egg_very_cracked"
    },
    {
      "name": "mc/blocks/twisting_vines_base",
      "path": "textures/blocks/twisting_vines_base"
    },
    {
      "name": "mc/blocks/twisting_vines_bottom",
      "path": "textures/blocks/twisting_vines_bottom"
    },
    {
      "name": "mc/blocks/verdant_froglight_side",
      "path": "textures/blocks/verdant_froglight_side"
    },
    {
      "name": "mc/blocks/verdant_froglight_top",
      "path": "textures/blocks/verdant_froglight_top"
    },
    {
      "name": "mc/blocks/vine",
      "path": "textures/blocks/vine"
    },
    {
      "name": "mc/blocks/vine_carried",
      "path": "textures/blocks/vine_carried"
    },
    {
      "name": "mc/blocks/warped_fungus",
      "path": "textures/blocks/warped_fungus"
    },
    {
      "name": "mc/blocks/warped_nylium_side",
      "path": "textures/blocks/warped_nylium_side"
    },
    {
      "name": "mc/blocks/warped_nylium_top",
      "path": "textures/blocks/warped_nylium_top"
    },
    {
      "name": "mc/blocks/warped_roots",
      "path": "textures/blocks/warped_roots"
    },
    {
      "name": "mc/blocks/warped_roots_pot",
      "path": "textures/blocks/warped_roots_pot"
    },
    {
      "name": "mc/blocks/warped_wart_block",
      "path": "textures/blocks/warped_wart_block"
    },
    {
      "name": "mc/blocks/waterlily",
      "path": "textures/blocks/waterlily"
    },
    {
      "name": "mc/blocks/water_flow",
      "path": "textures/blocks/water_flow"
    },
    {
      "name": "mc/blocks/water_flow_grey",
      "path": "textures/blocks/water_flow_grey"
    },
    {
      "name": "mc/blocks/water_placeholder",
      "path": "textures/blocks/water_placeholder"
    },
    {
      "name": "mc/blocks/water_still",
      "path": "textures/blocks/water_still"
    },
    {
      "name": "mc/blocks/water_still_grey",
      "path": "textures/blocks/water_still_grey"
    },
    {
      "name": "mc/blocks/weathered_copper",
      "path": "textures/blocks/weathered_copper"
    },
    {
      "name": "mc/blocks/weathered_cut_copper",
      "path": "textures/blocks/weathered_cut_copper"
    },
    {
      "name": "mc/blocks/web",
      "path": "textures/blocks/web"
    },
    {
      "name": "mc/blocks/weeping_vines",
      "path": "textures/blocks/weeping_vines"
    },
    {
      "name": "mc/blocks/weeping_vines_base",
      "path": "textures/blocks/weeping_vines_base"
    },
    {
      "name": "mc/blocks/weeping_vines_bottom",
      "path": "textures/blocks/weeping_vines_bottom"
    },
    {
      "name": "mc/blocks/weeping_vines_plant",
      "path": "textures/blocks/weeping_vines_plant"
    },
    {
      "name": "mc/blocks/wheat_stage_0",
      "path": "textures/blocks/wheat_stage_0"
    },
    {
      "name": "mc/blocks/wheat_stage_1",
      "path": "textures/blocks/wheat_stage_1"
    },
    {
      "name": "mc/blocks/wheat_stage_2",
      "path": "textures/blocks/wheat_stage_2"
    },
    {
      "name": "mc/blocks/wheat_stage_3",
      "path": "textures/blocks/wheat_stage_3"
    },
    {
      "name": "mc/blocks/wheat_stage_4",
      "path": "textures/blocks/wheat_stage_4"
    },
    {
      "name": "mc/blocks/wheat_stage_5",
      "path": "textures/blocks/wheat_stage_5"
    },
    {
      "name": "mc/blocks/wheat_stage_6",
      "path": "textures/blocks/wheat_stage_6"
    },
    {
      "name": "mc/blocks/wheat_stage_7",
      "path": "textures/blocks/wheat_stage_7"
    },
    {
      "name": "mc/blocks/wool_colored_black",
      "path": "textures/blocks/wool_colored_black"
    },
    {
      "name": "mc/blocks/wool_colored_blue",
      "path": "textures/blocks/wool_colored_blue"
    },
    {
      "name": "mc/blocks/wool_colored_brown",
      "path": "textures/blocks/wool_colored_brown"
    },
    {
      "name": "mc/blocks/wool_colored_cyan",
      "path": "textures/blocks/wool_colored_cyan"
    },
    {
      "name": "mc/blocks/wool_colored_gray",
      "path": "textures/blocks/wool_colored_gray"
    },
    {
      "name": "mc/blocks/wool_colored_green",
      "path": "textures/blocks/wool_colored_green"
    },
    {
      "name": "mc/blocks/wool_colored_light_blue",
      "path": "textures/blocks/wool_colored_light_blue"
    },
    {
      "name": "mc/blocks/wool_colored_lime",
      "path": "textures/blocks/wool_colored_lime"
    },
    {
      "name": "mc/blocks/wool_colored_magenta",
      "path": "textures/blocks/wool_colored_magenta"
    },
    {
      "name": "mc/blocks/wool_colored_orange",
      "path": "textures/blocks/wool_colored_orange"
    },
    {
      "name": "mc/blocks/wool_colored_pink",
      "path": "textures/blocks/wool_colored_pink"
    },
    {
      "name": "mc/blocks/wool_colored_purple",
      "path": "textures/blocks/wool_colored_purple"
    },
    {
      "name": "mc/blocks/wool_colored_red",
      "path": "textures/blocks/wool_colored_red"
    },
    {
      "name": "mc/blocks/wool_colored_silver",
      "path": "textures/blocks/wool_colored_silver"
    },
    {
      "name": "mc/blocks/wool_colored_white",
      "path": "textures/blocks/wool_colored_white"
    },
    {
      "name": "mc/blocks/wool_colored_yellow",
      "path": "textures/blocks/wool_colored_yellow"
    },
    {
      "name": "mc/items/acacia_chest_boat",
      "path": "textures/items/acacia_chest_boat"
    },
    {
      "name": "mc/items/acacia_hanging_sign",
      "path": "textures/items/acacia_hanging_sign"
    },
    {
      "name": "mc/items/amethyst_shard",
      "path": "textures/items/amethyst_shard"
    },
    {
      "name": "mc/items/angler_pottery_sherd",
      "path": "textures/items/angler_pottery_sherd"
    },
    {
      "name": "mc/items/apple",
      "path": "textures/items/apple"
    },
    {
      "name": "mc/items/apple_golden",
      "path": "textures/items/apple_golden"
    },
    {
      "name": "mc/items/archer_pottery_sherd",
      "path": "textures/items/archer_pottery_sherd"
    },
    {
      "name": "mc/items/armor_stand",
      "path": "textures/items/armor_stand"
    },
    {
      "name": "mc/items/arms_up_pottery_sherd",
      "path": "textures/items/arms_up_pottery_sherd"
    },
    {
      "name": "mc/items/arrow",
      "path": "textures/items/arrow"
    },
    {
      "name": "mc/items/bamboo",
      "path": "textures/items/bamboo"
    },
    {
      "name": "mc/items/bamboo_chest_raft",
      "path": "textures/items/bamboo_chest_raft"
    },
    {
      "name": "mc/items/bamboo_door",
      "path": "textures/items/bamboo_door"
    },
    {
      "name": "mc/items/bamboo_hanging_sign",
      "path": "textures/items/bamboo_hanging_sign"
    },
    {
      "name": "mc/items/bamboo_raft",
      "path": "textures/items/bamboo_raft"
    },
    {
      "name": "mc/items/bamboo_sign",
      "path": "textures/items/bamboo_sign"
    },
    {
      "name": "mc/items/banner_pattern",
      "path": "textures/items/banner_pattern"
    },
    {
      "name": "mc/items/bed_black",
      "path": "textures/items/bed_black"
    },
    {
      "name": "mc/items/bed_blue",
      "path": "textures/items/bed_blue"
    },
    {
      "name": "mc/items/bed_brown",
      "path": "textures/items/bed_brown"
    },
    {
      "name": "mc/items/bed_cyan",
      "path": "textures/items/bed_cyan"
    },
    {
      "name": "mc/items/bed_gray",
      "path": "textures/items/bed_gray"
    },
    {
      "name": "mc/items/bed_green",
      "path": "textures/items/bed_green"
    },
    {
      "name": "mc/items/bed_light_blue",
      "path": "textures/items/bed_light_blue"
    },
    {
      "name": "mc/items/bed_lime",
      "path": "textures/items/bed_lime"
    },
    {
      "name": "mc/items/bed_magenta",
      "path": "textures/items/bed_magenta"
    },
    {
      "name": "mc/items/bed_orange",
      "path": "textures/items/bed_orange"
    },
    {
      "name": "mc/items/bed_pink",
      "path": "textures/items/bed_pink"
    },
    {
      "name": "mc/items/bed_purple",
      "path": "textures/items/bed_purple"
    },
    {
      "name": "mc/items/bed_red",
      "path": "textures/items/bed_red"
    },
    {
      "name": "mc/items/bed_silver",
      "path": "textures/items/bed_silver"
    },
    {
      "name": "mc/items/bed_white",
      "path": "textures/items/bed_white"
    },
    {
      "name": "mc/items/bed_yellow",
      "path": "textures/items/bed_yellow"
    },
    {
      "name": "mc/items/beef_cooked",
      "path": "textures/items/beef_cooked"
    },
    {
      "name": "mc/items/beef_raw",
      "path": "textures/items/beef_raw"
    },
    {
      "name": "mc/items/beetroot",
      "path": "textures/items/beetroot"
    },
    {
      "name": "mc/items/beetroot_soup",
      "path": "textures/items/beetroot_soup"
    },
    {
      "name": "mc/items/birch_chest_boat",
      "path": "textures/items/birch_chest_boat"
    },
    {
      "name": "mc/items/birch_hanging_sign",
      "path": "textures/items/birch_hanging_sign"
    },
    {
      "name": "mc/items/blade_pottery_sherd",
      "path": "textures/items/blade_pottery_sherd"
    },
    {
      "name": "mc/items/blaze_powder",
      "path": "textures/items/blaze_powder"
    },
    {
      "name": "mc/items/blaze_rod",
      "path": "textures/items/blaze_rod"
    },
    {
      "name": "mc/items/boat",
      "path": "textures/items/boat"
    },
    {
      "name": "mc/items/boat_acacia",
      "path": "textures/items/boat_acacia"
    },
    {
      "name": "mc/items/boat_birch",
      "path": "textures/items/boat_birch"
    },
    {
      "name": "mc/items/boat_darkoak",
      "path": "textures/items/boat_darkoak"
    },
    {
      "name": "mc/items/boat_dark_oak",
      "path": "textures/items/boat_dark_oak"
    },
    {
      "name": "mc/items/boat_jungle",
      "path": "textures/items/boat_jungle"
    },
    {
      "name": "mc/items/boat_oak",
      "path": "textures/items/boat_oak"
    },
    {
      "name": "mc/items/boat_spruce",
      "path": "textures/items/boat_spruce"
    },
    {
      "name": "mc/items/bone",
      "path": "textures/items/bone"
    },
    {
      "name": "mc/items/book_enchanted",
      "path": "textures/items/book_enchanted"
    },
    {
      "name": "mc/items/book_normal",
      "path": "textures/items/book_normal"
    },
    {
      "name": "mc/items/book_portfolio",
      "path": "textures/items/book_portfolio"
    },
    {
      "name": "mc/items/book_writable",
      "path": "textures/items/book_writable"
    },
    {
      "name": "mc/items/book_written",
      "path": "textures/items/book_written"
    },
    {
      "name": "mc/items/bowl",
      "path": "textures/items/bowl"
    },
    {
      "name": "mc/items/bow_pulling_0",
      "path": "textures/items/bow_pulling_0"
    },
    {
      "name": "mc/items/bow_pulling_1",
      "path": "textures/items/bow_pulling_1"
    },
    {
      "name": "mc/items/bow_pulling_2",
      "path": "textures/items/bow_pulling_2"
    },
    {
      "name": "mc/items/bow_standby",
      "path": "textures/items/bow_standby"
    },
    {
      "name": "mc/items/bread",
      "path": "textures/items/bread"
    },
    {
      "name": "mc/items/brewer_pottery_sherd",
      "path": "textures/items/brewer_pottery_sherd"
    },
    {
      "name": "mc/items/brewing_stand",
      "path": "textures/items/brewing_stand"
    },
    {
      "name": "mc/items/brick",
      "path": "textures/items/brick"
    },
    {
      "name": "mc/items/broken_elytra",
      "path": "textures/items/broken_elytra"
    },
    {
      "name": "mc/items/brush",
      "path": "textures/items/brush"
    },
    {
      "name": "mc/items/bucket_axolotl",
      "path": "textures/items/bucket_axolotl"
    },
    {
      "name": "mc/items/bucket_cod",
      "path": "textures/items/bucket_cod"
    },
    {
      "name": "mc/items/bucket_empty",
      "path": "textures/items/bucket_empty"
    },
    {
      "name": "mc/items/bucket_lava",
      "path": "textures/items/bucket_lava"
    },
    {
      "name": "mc/items/bucket_milk",
      "path": "textures/items/bucket_milk"
    },
    {
      "name": "mc/items/bucket_powder_snow",
      "path": "textures/items/bucket_powder_snow"
    },
    {
      "name": "mc/items/bucket_pufferfish",
      "path": "textures/items/bucket_pufferfish"
    },
    {
      "name": "mc/items/bucket_salmon",
      "path": "textures/items/bucket_salmon"
    },
    {
      "name": "mc/items/bucket_tadpole",
      "path": "textures/items/bucket_tadpole"
    },
    {
      "name": "mc/items/bucket_tropical",
      "path": "textures/items/bucket_tropical"
    },
    {
      "name": "mc/items/bucket_water",
      "path": "textures/items/bucket_water"
    },
    {
      "name": "mc/items/burn_pottery_sherd",
      "path": "textures/items/burn_pottery_sherd"
    },
    {
      "name": "mc/items/cake",
      "path": "textures/items/cake"
    },
    {
      "name": "mc/items/campfire",
      "path": "textures/items/campfire"
    },
    {
      "name": "mc/items/carrot",
      "path": "textures/items/carrot"
    },
    {
      "name": "mc/items/carrot_golden",
      "path": "textures/items/carrot_golden"
    },
    {
      "name": "mc/items/carrot_on_a_stick",
      "path": "textures/items/carrot_on_a_stick"
    },
    {
      "name": "mc/items/cauldron",
      "path": "textures/items/cauldron"
    },
    {
      "name": "mc/items/chain",
      "path": "textures/items/chain"
    },
    {
      "name": "mc/items/chainmail_boots",
      "path": "textures/items/chainmail_boots"
    },
    {
      "name": "mc/items/chainmail_chestplate",
      "path": "textures/items/chainmail_chestplate"
    },
    {
      "name": "mc/items/chainmail_helmet",
      "path": "textures/items/chainmail_helmet"
    },
    {
      "name": "mc/items/chainmail_leggings",
      "path": "textures/items/chainmail_leggings"
    },
    {
      "name": "mc/items/chalkboard_large",
      "path": "textures/items/chalkboard_large"
    },
    {
      "name": "mc/items/chalkboard_medium",
      "path": "textures/items/chalkboard_medium"
    },
    {
      "name": "mc/items/chalkboard_small",
      "path": "textures/items/chalkboard_small"
    },
    {
      "name": "mc/items/charcoal",
      "path": "textures/items/charcoal"
    },
    {
      "name": "mc/items/cherry_boat",
      "path": "textures/items/cherry_boat"
    },
    {
      "name": "mc/items/cherry_chest_boat",
      "path": "textures/items/cherry_chest_boat"
    },
    {
      "name": "mc/items/cherry_door",
      "path": "textures/items/cherry_door"
    },
    {
      "name": "mc/items/cherry_hanging_sign",
      "path": "textures/items/cherry_hanging_sign"
    },
    {
      "name": "mc/items/cherry_sign",
      "path": "textures/items/cherry_sign"
    },
    {
      "name": "mc/items/chicken_cooked",
      "path": "textures/items/chicken_cooked"
    },
    {
      "name": "mc/items/chicken_raw",
      "path": "textures/items/chicken_raw"
    },
    {
      "name": "mc/items/chorus_fruit",
      "path": "textures/items/chorus_fruit"
    },
    {
      "name": "mc/items/chorus_fruit_popped",
      "path": "textures/items/chorus_fruit_popped"
    },
    {
      "name": "mc/items/clay_ball",
      "path": "textures/items/clay_ball"
    },
    {
      "name": "mc/items/clock_item",
      "path": "textures/items/clock_item"
    },
    {
      "name": "mc/items/coal",
      "path": "textures/items/coal"
    },
    {
      "name": "mc/items/coast_armor_trim_smithing_template",
      "path": "textures/items/coast_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/comparator",
      "path": "textures/items/comparator"
    },
    {
      "name": "mc/items/compass_atlas",
      "path": "textures/items/compass_atlas"
    },
    {
      "name": "mc/items/compass_item",
      "path": "textures/items/compass_item"
    },
    {
      "name": "mc/items/cookie",
      "path": "textures/items/cookie"
    },
    {
      "name": "mc/items/copper_ingot",
      "path": "textures/items/copper_ingot"
    },
    {
      "name": "mc/items/crimson_door",
      "path": "textures/items/crimson_door"
    },
    {
      "name": "mc/items/crimson_hanging_sign",
      "path": "textures/items/crimson_hanging_sign"
    },
    {
      "name": "mc/items/crossbow_arrow",
      "path": "textures/items/crossbow_arrow"
    },
    {
      "name": "mc/items/crossbow_firework",
      "path": "textures/items/crossbow_firework"
    },
    {
      "name": "mc/items/crossbow_pulling_0",
      "path": "textures/items/crossbow_pulling_0"
    },
    {
      "name": "mc/items/crossbow_pulling_1",
      "path": "textures/items/crossbow_pulling_1"
    },
    {
      "name": "mc/items/crossbow_pulling_2",
      "path": "textures/items/crossbow_pulling_2"
    },
    {
      "name": "mc/items/crossbow_standby",
      "path": "textures/items/crossbow_standby"
    },
    {
      "name": "mc/items/danger_pottery_sherd",
      "path": "textures/items/danger_pottery_sherd"
    },
    {
      "name": "mc/items/dark_oak_chest_boat",
      "path": "textures/items/dark_oak_chest_boat"
    },
    {
      "name": "mc/items/dark_oak_hanging_sign",
      "path": "textures/items/dark_oak_hanging_sign"
    },
    {
      "name": "mc/items/diamond",
      "path": "textures/items/diamond"
    },
    {
      "name": "mc/items/diamond_axe",
      "path": "textures/items/diamond_axe"
    },
    {
      "name": "mc/items/diamond_boots",
      "path": "textures/items/diamond_boots"
    },
    {
      "name": "mc/items/diamond_chestplate",
      "path": "textures/items/diamond_chestplate"
    },
    {
      "name": "mc/items/diamond_helmet",
      "path": "textures/items/diamond_helmet"
    },
    {
      "name": "mc/items/diamond_hoe",
      "path": "textures/items/diamond_hoe"
    },
    {
      "name": "mc/items/diamond_horse_armor",
      "path": "textures/items/diamond_horse_armor"
    },
    {
      "name": "mc/items/diamond_leggings",
      "path": "textures/items/diamond_leggings"
    },
    {
      "name": "mc/items/diamond_pickaxe",
      "path": "textures/items/diamond_pickaxe"
    },
    {
      "name": "mc/items/diamond_shovel",
      "path": "textures/items/diamond_shovel"
    },
    {
      "name": "mc/items/diamond_sword",
      "path": "textures/items/diamond_sword"
    },
    {
      "name": "mc/items/disc_fragment_5",
      "path": "textures/items/disc_fragment_5"
    },
    {
      "name": "mc/items/door_acacia",
      "path": "textures/items/door_acacia"
    },
    {
      "name": "mc/items/door_birch",
      "path": "textures/items/door_birch"
    },
    {
      "name": "mc/items/door_dark_oak",
      "path": "textures/items/door_dark_oak"
    },
    {
      "name": "mc/items/door_iron",
      "path": "textures/items/door_iron"
    },
    {
      "name": "mc/items/door_jungle",
      "path": "textures/items/door_jungle"
    },
    {
      "name": "mc/items/door_spruce",
      "path": "textures/items/door_spruce"
    },
    {
      "name": "mc/items/door_wood",
      "path": "textures/items/door_wood"
    },
    {
      "name": "mc/items/dragons_breath",
      "path": "textures/items/dragons_breath"
    },
    {
      "name": "mc/items/dragon_fireball",
      "path": "textures/items/dragon_fireball"
    },
    {
      "name": "mc/items/dried_kelp",
      "path": "textures/items/dried_kelp"
    },
    {
      "name": "mc/items/dune_armor_trim_smithing_template",
      "path": "textures/items/dune_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/dye_powder_black",
      "path": "textures/items/dye_powder_black"
    },
    {
      "name": "mc/items/dye_powder_black_new",
      "path": "textures/items/dye_powder_black_new"
    },
    {
      "name": "mc/items/dye_powder_blue",
      "path": "textures/items/dye_powder_blue"
    },
    {
      "name": "mc/items/dye_powder_blue_new",
      "path": "textures/items/dye_powder_blue_new"
    },
    {
      "name": "mc/items/dye_powder_brown",
      "path": "textures/items/dye_powder_brown"
    },
    {
      "name": "mc/items/dye_powder_brown_new",
      "path": "textures/items/dye_powder_brown_new"
    },
    {
      "name": "mc/items/dye_powder_cyan",
      "path": "textures/items/dye_powder_cyan"
    },
    {
      "name": "mc/items/dye_powder_glow",
      "path": "textures/items/dye_powder_glow"
    },
    {
      "name": "mc/items/dye_powder_gray",
      "path": "textures/items/dye_powder_gray"
    },
    {
      "name": "mc/items/dye_powder_green",
      "path": "textures/items/dye_powder_green"
    },
    {
      "name": "mc/items/dye_powder_light_blue",
      "path": "textures/items/dye_powder_light_blue"
    },
    {
      "name": "mc/items/dye_powder_lime",
      "path": "textures/items/dye_powder_lime"
    },
    {
      "name": "mc/items/dye_powder_magenta",
      "path": "textures/items/dye_powder_magenta"
    },
    {
      "name": "mc/items/dye_powder_orange",
      "path": "textures/items/dye_powder_orange"
    },
    {
      "name": "mc/items/dye_powder_pink",
      "path": "textures/items/dye_powder_pink"
    },
    {
      "name": "mc/items/dye_powder_purple",
      "path": "textures/items/dye_powder_purple"
    },
    {
      "name": "mc/items/dye_powder_red",
      "path": "textures/items/dye_powder_red"
    },
    {
      "name": "mc/items/dye_powder_silver",
      "path": "textures/items/dye_powder_silver"
    },
    {
      "name": "mc/items/dye_powder_white",
      "path": "textures/items/dye_powder_white"
    },
    {
      "name": "mc/items/dye_powder_white_new",
      "path": "textures/items/dye_powder_white_new"
    },
    {
      "name": "mc/items/dye_powder_yellow",
      "path": "textures/items/dye_powder_yellow"
    },
    {
      "name": "mc/items/echo_shard",
      "path": "textures/items/echo_shard"
    },
    {
      "name": "mc/items/egg",
      "path": "textures/items/egg"
    },
    {
      "name": "mc/items/egg_agent",
      "path": "textures/items/egg_agent"
    },
    {
      "name": "mc/items/egg_bat",
      "path": "textures/items/egg_bat"
    },
    {
      "name": "mc/items/egg_bee",
      "path": "textures/items/egg_bee"
    },
    {
      "name": "mc/items/egg_blaze",
      "path": "textures/items/egg_blaze"
    },
    {
      "name": "mc/items/egg_cat",
      "path": "textures/items/egg_cat"
    },
    {
      "name": "mc/items/egg_cave_spider",
      "path": "textures/items/egg_cave_spider"
    },
    {
      "name": "mc/items/egg_chicken",
      "path": "textures/items/egg_chicken"
    },
    {
      "name": "mc/items/egg_clownfish",
      "path": "textures/items/egg_clownfish"
    },
    {
      "name": "mc/items/egg_cod",
      "path": "textures/items/egg_cod"
    },
    {
      "name": "mc/items/egg_cow",
      "path": "textures/items/egg_cow"
    },
    {
      "name": "mc/items/egg_creeper",
      "path": "textures/items/egg_creeper"
    },
    {
      "name": "mc/items/egg_dolphin",
      "path": "textures/items/egg_dolphin"
    },
    {
      "name": "mc/items/egg_donkey",
      "path": "textures/items/egg_donkey"
    },
    {
      "name": "mc/items/egg_drowned",
      "path": "textures/items/egg_drowned"
    },
    {
      "name": "mc/items/egg_elderguardian",
      "path": "textures/items/egg_elderguardian"
    },
    {
      "name": "mc/items/egg_enderman",
      "path": "textures/items/egg_enderman"
    },
    {
      "name": "mc/items/egg_endermite",
      "path": "textures/items/egg_endermite"
    },
    {
      "name": "mc/items/egg_evoker",
      "path": "textures/items/egg_evoker"
    },
    {
      "name": "mc/items/egg_fish",
      "path": "textures/items/egg_fish"
    },
    {
      "name": "mc/items/egg_fox",
      "path": "textures/items/egg_fox"
    },
    {
      "name": "mc/items/egg_ghast",
      "path": "textures/items/egg_ghast"
    },
    {
      "name": "mc/items/egg_glow_squid",
      "path": "textures/items/egg_glow_squid"
    },
    {
      "name": "mc/items/egg_guardian",
      "path": "textures/items/egg_guardian"
    },
    {
      "name": "mc/items/egg_horse",
      "path": "textures/items/egg_horse"
    },
    {
      "name": "mc/items/egg_husk",
      "path": "textures/items/egg_husk"
    },
    {
      "name": "mc/items/egg_lava_slime",
      "path": "textures/items/egg_lava_slime"
    },
    {
      "name": "mc/items/egg_llama",
      "path": "textures/items/egg_llama"
    },
    {
      "name": "mc/items/egg_mask",
      "path": "textures/items/egg_mask"
    },
    {
      "name": "mc/items/egg_mule",
      "path": "textures/items/egg_mule"
    },
    {
      "name": "mc/items/egg_mushroomcow",
      "path": "textures/items/egg_mushroomcow"
    },
    {
      "name": "mc/items/egg_npc",
      "path": "textures/items/egg_npc"
    },
    {
      "name": "mc/items/egg_null",
      "path": "textures/items/egg_null"
    },
    {
      "name": "mc/items/egg_ocelot",
      "path": "textures/items/egg_ocelot"
    },
    {
      "name": "mc/items/egg_panda",
      "path": "textures/items/egg_panda"
    },
    {
      "name": "mc/items/egg_parrot",
      "path": "textures/items/egg_parrot"
    },
    {
      "name": "mc/items/egg_phantom",
      "path": "textures/items/egg_phantom"
    },
    {
      "name": "mc/items/egg_pig",
      "path": "textures/items/egg_pig"
    },
    {
      "name": "mc/items/egg_pigzombie",
      "path": "textures/items/egg_pigzombie"
    },
    {
      "name": "mc/items/egg_pillager",
      "path": "textures/items/egg_pillager"
    },
    {
      "name": "mc/items/egg_polarbear",
      "path": "textures/items/egg_polarbear"
    },
    {
      "name": "mc/items/egg_pufferfish",
      "path": "textures/items/egg_pufferfish"
    },
    {
      "name": "mc/items/egg_rabbit",
      "path": "textures/items/egg_rabbit"
    },
    {
      "name": "mc/items/egg_ravager",
      "path": "textures/items/egg_ravager"
    },
    {
      "name": "mc/items/egg_salmon",
      "path": "textures/items/egg_salmon"
    },
    {
      "name": "mc/items/egg_sheep",
      "path": "textures/items/egg_sheep"
    },
    {
      "name": "mc/items/egg_shulker",
      "path": "textures/items/egg_shulker"
    },
    {
      "name": "mc/items/egg_silverfish",
      "path": "textures/items/egg_silverfish"
    },
    {
      "name": "mc/items/egg_skeleton",
      "path": "textures/items/egg_skeleton"
    },
    {
      "name": "mc/items/egg_skeletonhorse",
      "path": "textures/items/egg_skeletonhorse"
    },
    {
      "name": "mc/items/egg_slime",
      "path": "textures/items/egg_slime"
    },
    {
      "name": "mc/items/egg_spider",
      "path": "textures/items/egg_spider"
    },
    {
      "name": "mc/items/egg_squid",
      "path": "textures/items/egg_squid"
    },
    {
      "name": "mc/items/egg_stray",
      "path": "textures/items/egg_stray"
    },
    {
      "name": "mc/items/egg_turtle",
      "path": "textures/items/egg_turtle"
    },
    {
      "name": "mc/items/egg_vex",
      "path": "textures/items/egg_vex"
    },
    {
      "name": "mc/items/egg_villager",
      "path": "textures/items/egg_villager"
    },
    {
      "name": "mc/items/egg_vindicator",
      "path": "textures/items/egg_vindicator"
    },
    {
      "name": "mc/items/egg_wanderingtrader",
      "path": "textures/items/egg_wanderingtrader"
    },
    {
      "name": "mc/items/egg_witch",
      "path": "textures/items/egg_witch"
    },
    {
      "name": "mc/items/egg_wither",
      "path": "textures/items/egg_wither"
    },
    {
      "name": "mc/items/egg_wolf",
      "path": "textures/items/egg_wolf"
    },
    {
      "name": "mc/items/egg_zombie",
      "path": "textures/items/egg_zombie"
    },
    {
      "name": "mc/items/egg_zombiehorse",
      "path": "textures/items/egg_zombiehorse"
    },
    {
      "name": "mc/items/egg_zombievillager",
      "path": "textures/items/egg_zombievillager"
    },
    {
      "name": "mc/items/elytra",
      "path": "textures/items/elytra"
    },
    {
      "name": "mc/items/emerald",
      "path": "textures/items/emerald"
    },
    {
      "name": "mc/items/empty_armor_slot_boots",
      "path": "textures/items/empty_armor_slot_boots"
    },
    {
      "name": "mc/items/empty_armor_slot_chestplate",
      "path": "textures/items/empty_armor_slot_chestplate"
    },
    {
      "name": "mc/items/empty_armor_slot_helmet",
      "path": "textures/items/empty_armor_slot_helmet"
    },
    {
      "name": "mc/items/empty_armor_slot_leggings",
      "path": "textures/items/empty_armor_slot_leggings"
    },
    {
      "name": "mc/items/empty_armor_slot_shield",
      "path": "textures/items/empty_armor_slot_shield"
    },
    {
      "name": "mc/items/ender_eye",
      "path": "textures/items/ender_eye"
    },
    {
      "name": "mc/items/ender_pearl",
      "path": "textures/items/ender_pearl"
    },
    {
      "name": "mc/items/end_crystal",
      "path": "textures/items/end_crystal"
    },
    {
      "name": "mc/items/experience_bottle",
      "path": "textures/items/experience_bottle"
    },
    {
      "name": "mc/items/explorer_pottery_sherd",
      "path": "textures/items/explorer_pottery_sherd"
    },
    {
      "name": "mc/items/eye_armor_trim_smithing_template",
      "path": "textures/items/eye_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/feather",
      "path": "textures/items/feather"
    },
    {
      "name": "mc/items/fireball",
      "path": "textures/items/fireball"
    },
    {
      "name": "mc/items/fireworks",
      "path": "textures/items/fireworks"
    },
    {
      "name": "mc/items/fishing_rod_cast",
      "path": "textures/items/fishing_rod_cast"
    },
    {
      "name": "mc/items/fishing_rod_uncast",
      "path": "textures/items/fishing_rod_uncast"
    },
    {
      "name": "mc/items/fish_clownfish_raw",
      "path": "textures/items/fish_clownfish_raw"
    },
    {
      "name": "mc/items/fish_cooked",
      "path": "textures/items/fish_cooked"
    },
    {
      "name": "mc/items/fish_pufferfish_raw",
      "path": "textures/items/fish_pufferfish_raw"
    },
    {
      "name": "mc/items/fish_raw",
      "path": "textures/items/fish_raw"
    },
    {
      "name": "mc/items/fish_salmon_cooked",
      "path": "textures/items/fish_salmon_cooked"
    },
    {
      "name": "mc/items/fish_salmon_raw",
      "path": "textures/items/fish_salmon_raw"
    },
    {
      "name": "mc/items/flint",
      "path": "textures/items/flint"
    },
    {
      "name": "mc/items/flint_and_steel",
      "path": "textures/items/flint_and_steel"
    },
    {
      "name": "mc/items/flower_pot",
      "path": "textures/items/flower_pot"
    },
    {
      "name": "mc/items/friend_pottery_sherd",
      "path": "textures/items/friend_pottery_sherd"
    },
    {
      "name": "mc/items/ghast_tear",
      "path": "textures/items/ghast_tear"
    },
    {
      "name": "mc/items/glowstone_dust",
      "path": "textures/items/glowstone_dust"
    },
    {
      "name": "mc/items/glow_berries",
      "path": "textures/items/glow_berries"
    },
    {
      "name": "mc/items/glow_item_frame",
      "path": "textures/items/glow_item_frame"
    },
    {
      "name": "mc/items/goat_horn",
      "path": "textures/items/goat_horn"
    },
    {
      "name": "mc/items/gold_axe",
      "path": "textures/items/gold_axe"
    },
    {
      "name": "mc/items/gold_boots",
      "path": "textures/items/gold_boots"
    },
    {
      "name": "mc/items/gold_chestplate",
      "path": "textures/items/gold_chestplate"
    },
    {
      "name": "mc/items/gold_helmet",
      "path": "textures/items/gold_helmet"
    },
    {
      "name": "mc/items/gold_hoe",
      "path": "textures/items/gold_hoe"
    },
    {
      "name": "mc/items/gold_horse_armor",
      "path": "textures/items/gold_horse_armor"
    },
    {
      "name": "mc/items/gold_ingot",
      "path": "textures/items/gold_ingot"
    },
    {
      "name": "mc/items/gold_leggings",
      "path": "textures/items/gold_leggings"
    },
    {
      "name": "mc/items/gold_nugget",
      "path": "textures/items/gold_nugget"
    },
    {
      "name": "mc/items/gold_pickaxe",
      "path": "textures/items/gold_pickaxe"
    },
    {
      "name": "mc/items/gold_shovel",
      "path": "textures/items/gold_shovel"
    },
    {
      "name": "mc/items/gold_sword",
      "path": "textures/items/gold_sword"
    },
    {
      "name": "mc/items/gunpowder",
      "path": "textures/items/gunpowder"
    },
    {
      "name": "mc/items/hanging_roots",
      "path": "textures/items/hanging_roots"
    },
    {
      "name": "mc/items/heartbreak_pottery_sherd",
      "path": "textures/items/heartbreak_pottery_sherd"
    },
    {
      "name": "mc/items/heartofthesea_closed",
      "path": "textures/items/heartofthesea_closed"
    },
    {
      "name": "mc/items/heart_pottery_sherd",
      "path": "textures/items/heart_pottery_sherd"
    },
    {
      "name": "mc/items/hoglin_meat_cooked",
      "path": "textures/items/hoglin_meat_cooked"
    },
    {
      "name": "mc/items/hoglin_meat_raw",
      "path": "textures/items/hoglin_meat_raw"
    },
    {
      "name": "mc/items/honeycomb",
      "path": "textures/items/honeycomb"
    },
    {
      "name": "mc/items/honey_bottle",
      "path": "textures/items/honey_bottle"
    },
    {
      "name": "mc/items/hopper",
      "path": "textures/items/hopper"
    },
    {
      "name": "mc/items/host_armor_trim_smithing_template",
      "path": "textures/items/host_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/howl_pottery_sherd",
      "path": "textures/items/howl_pottery_sherd"
    },
    {
      "name": "mc/items/iron_axe",
      "path": "textures/items/iron_axe"
    },
    {
      "name": "mc/items/iron_boots",
      "path": "textures/items/iron_boots"
    },
    {
      "name": "mc/items/iron_chestplate",
      "path": "textures/items/iron_chestplate"
    },
    {
      "name": "mc/items/iron_helmet",
      "path": "textures/items/iron_helmet"
    },
    {
      "name": "mc/items/iron_hoe",
      "path": "textures/items/iron_hoe"
    },
    {
      "name": "mc/items/iron_horse_armor",
      "path": "textures/items/iron_horse_armor"
    },
    {
      "name": "mc/items/iron_ingot",
      "path": "textures/items/iron_ingot"
    },
    {
      "name": "mc/items/iron_leggings",
      "path": "textures/items/iron_leggings"
    },
    {
      "name": "mc/items/iron_nugget",
      "path": "textures/items/iron_nugget"
    },
    {
      "name": "mc/items/iron_pickaxe",
      "path": "textures/items/iron_pickaxe"
    },
    {
      "name": "mc/items/iron_shovel",
      "path": "textures/items/iron_shovel"
    },
    {
      "name": "mc/items/iron_sword",
      "path": "textures/items/iron_sword"
    },
    {
      "name": "mc/items/item_frame",
      "path": "textures/items/item_frame"
    },
    {
      "name": "mc/items/jungle_chest_boat",
      "path": "textures/items/jungle_chest_boat"
    },
    {
      "name": "mc/items/jungle_hanging_sign",
      "path": "textures/items/jungle_hanging_sign"
    },
    {
      "name": "mc/items/kelp",
      "path": "textures/items/kelp"
    },
    {
      "name": "mc/items/lantern",
      "path": "textures/items/lantern"
    },
    {
      "name": "mc/items/lead",
      "path": "textures/items/lead"
    },
    {
      "name": "mc/items/leather",
      "path": "textures/items/leather"
    },
    {
      "name": "mc/items/leather_chestplate",
      "path": "textures/items/leather_chestplate"
    },
    {
      "name": "mc/items/lever",
      "path": "textures/items/lever"
    },
    {
      "name": "mc/items/light_block_0",
      "path": "textures/items/light_block_0"
    },
    {
      "name": "mc/items/light_block_1",
      "path": "textures/items/light_block_1"
    },
    {
      "name": "mc/items/light_block_10",
      "path": "textures/items/light_block_10"
    },
    {
      "name": "mc/items/light_block_11",
      "path": "textures/items/light_block_11"
    },
    {
      "name": "mc/items/light_block_12",
      "path": "textures/items/light_block_12"
    },
    {
      "name": "mc/items/light_block_13",
      "path": "textures/items/light_block_13"
    },
    {
      "name": "mc/items/light_block_14",
      "path": "textures/items/light_block_14"
    },
    {
      "name": "mc/items/light_block_15",
      "path": "textures/items/light_block_15"
    },
    {
      "name": "mc/items/light_block_2",
      "path": "textures/items/light_block_2"
    },
    {
      "name": "mc/items/light_block_3",
      "path": "textures/items/light_block_3"
    },
    {
      "name": "mc/items/light_block_4",
      "path": "textures/items/light_block_4"
    },
    {
      "name": "mc/items/light_block_5",
      "path": "textures/items/light_block_5"
    },
    {
      "name": "mc/items/light_block_6",
      "path": "textures/items/light_block_6"
    },
    {
      "name": "mc/items/light_block_7",
      "path": "textures/items/light_block_7"
    },
    {
      "name": "mc/items/light_block_8",
      "path": "textures/items/light_block_8"
    },
    {
      "name": "mc/items/light_block_9",
      "path": "textures/items/light_block_9"
    },
    {
      "name": "mc/items/lodestonecompass_atlas",
      "path": "textures/items/lodestonecompass_atlas"
    },
    {
      "name": "mc/items/lodestonecompass_item",
      "path": "textures/items/lodestonecompass_item"
    },
    {
      "name": "mc/items/magma_cream",
      "path": "textures/items/magma_cream"
    },
    {
      "name": "mc/items/mangrove_boat",
      "path": "textures/items/mangrove_boat"
    },
    {
      "name": "mc/items/mangrove_chest_boat",
      "path": "textures/items/mangrove_chest_boat"
    },
    {
      "name": "mc/items/mangrove_door",
      "path": "textures/items/mangrove_door"
    },
    {
      "name": "mc/items/mangrove_hanging_sign",
      "path": "textures/items/mangrove_hanging_sign"
    },
    {
      "name": "mc/items/mangrove_propagule",
      "path": "textures/items/mangrove_propagule"
    },
    {
      "name": "mc/items/mangrove_sign",
      "path": "textures/items/mangrove_sign"
    },
    {
      "name": "mc/items/map_empty",
      "path": "textures/items/map_empty"
    },
    {
      "name": "mc/items/map_filled",
      "path": "textures/items/map_filled"
    },
    {
      "name": "mc/items/map_locked",
      "path": "textures/items/map_locked"
    },
    {
      "name": "mc/items/map_mansion",
      "path": "textures/items/map_mansion"
    },
    {
      "name": "mc/items/map_monument",
      "path": "textures/items/map_monument"
    },
    {
      "name": "mc/items/map_nautilus",
      "path": "textures/items/map_nautilus"
    },
    {
      "name": "mc/items/melon",
      "path": "textures/items/melon"
    },
    {
      "name": "mc/items/melon_speckled",
      "path": "textures/items/melon_speckled"
    },
    {
      "name": "mc/items/minecart_chest",
      "path": "textures/items/minecart_chest"
    },
    {
      "name": "mc/items/minecart_command_block",
      "path": "textures/items/minecart_command_block"
    },
    {
      "name": "mc/items/minecart_furnace",
      "path": "textures/items/minecart_furnace"
    },
    {
      "name": "mc/items/minecart_hopper",
      "path": "textures/items/minecart_hopper"
    },
    {
      "name": "mc/items/minecart_normal",
      "path": "textures/items/minecart_normal"
    },
    {
      "name": "mc/items/minecart_tnt",
      "path": "textures/items/minecart_tnt"
    },
    {
      "name": "mc/items/miner_pottery_sherd",
      "path": "textures/items/miner_pottery_sherd"
    },
    {
      "name": "mc/items/mourner_pottery_sherd",
      "path": "textures/items/mourner_pottery_sherd"
    },
    {
      "name": "mc/items/mushroom_stew",
      "path": "textures/items/mushroom_stew"
    },
    {
      "name": "mc/items/music_disc_relic",
      "path": "textures/items/music_disc_relic"
    },
    {
      "name": "mc/items/mutton_cooked",
      "path": "textures/items/mutton_cooked"
    },
    {
      "name": "mc/items/mutton_raw",
      "path": "textures/items/mutton_raw"
    },
    {
      "name": "mc/items/name_tag",
      "path": "textures/items/name_tag"
    },
    {
      "name": "mc/items/nautilus",
      "path": "textures/items/nautilus"
    },
    {
      "name": "mc/items/netherbrick",
      "path": "textures/items/netherbrick"
    },
    {
      "name": "mc/items/netherite_axe",
      "path": "textures/items/netherite_axe"
    },
    {
      "name": "mc/items/netherite_boots",
      "path": "textures/items/netherite_boots"
    },
    {
      "name": "mc/items/netherite_chestplate",
      "path": "textures/items/netherite_chestplate"
    },
    {
      "name": "mc/items/netherite_helmet",
      "path": "textures/items/netherite_helmet"
    },
    {
      "name": "mc/items/netherite_hoe",
      "path": "textures/items/netherite_hoe"
    },
    {
      "name": "mc/items/netherite_ingot",
      "path": "textures/items/netherite_ingot"
    },
    {
      "name": "mc/items/netherite_leggings",
      "path": "textures/items/netherite_leggings"
    },
    {
      "name": "mc/items/netherite_pickaxe",
      "path": "textures/items/netherite_pickaxe"
    },
    {
      "name": "mc/items/netherite_scrap",
      "path": "textures/items/netherite_scrap"
    },
    {
      "name": "mc/items/netherite_shovel",
      "path": "textures/items/netherite_shovel"
    },
    {
      "name": "mc/items/netherite_sword",
      "path": "textures/items/netherite_sword"
    },
    {
      "name": "mc/items/netherite_upgrade_smithing_template",
      "path": "textures/items/netherite_upgrade_smithing_template"
    },
    {
      "name": "mc/items/nether_sprouts",
      "path": "textures/items/nether_sprouts"
    },
    {
      "name": "mc/items/nether_star",
      "path": "textures/items/nether_star"
    },
    {
      "name": "mc/items/nether_wart",
      "path": "textures/items/nether_wart"
    },
    {
      "name": "mc/items/oak_chest_boat",
      "path": "textures/items/oak_chest_boat"
    },
    {
      "name": "mc/items/oak_hanging_sign",
      "path": "textures/items/oak_hanging_sign"
    },
    {
      "name": "mc/items/painting",
      "path": "textures/items/painting"
    },
    {
      "name": "mc/items/paper",
      "path": "textures/items/paper"
    },
    {
      "name": "mc/items/phantom_membrane",
      "path": "textures/items/phantom_membrane"
    },
    {
      "name": "mc/items/pink_petals",
      "path": "textures/items/pink_petals"
    },
    {
      "name": "mc/items/pitcher_pod",
      "path": "textures/items/pitcher_pod"
    },
    {
      "name": "mc/items/plenty_pottery_sherd",
      "path": "textures/items/plenty_pottery_sherd"
    },
    {
      "name": "mc/items/porkchop_cooked",
      "path": "textures/items/porkchop_cooked"
    },
    {
      "name": "mc/items/porkchop_raw",
      "path": "textures/items/porkchop_raw"
    },
    {
      "name": "mc/items/potato",
      "path": "textures/items/potato"
    },
    {
      "name": "mc/items/potato_baked",
      "path": "textures/items/potato_baked"
    },
    {
      "name": "mc/items/potato_poisonous",
      "path": "textures/items/potato_poisonous"
    },
    {
      "name": "mc/items/potion_bottle_absorption",
      "path": "textures/items/potion_bottle_absorption"
    },
    {
      "name": "mc/items/potion_bottle_blindness",
      "path": "textures/items/potion_bottle_blindness"
    },
    {
      "name": "mc/items/potion_bottle_confusion",
      "path": "textures/items/potion_bottle_confusion"
    },
    {
      "name": "mc/items/potion_bottle_damageBoost",
      "path": "textures/items/potion_bottle_damageBoost"
    },
    {
      "name": "mc/items/potion_bottle_digSlowdown",
      "path": "textures/items/potion_bottle_digSlowdown"
    },
    {
      "name": "mc/items/potion_bottle_digSpeed",
      "path": "textures/items/potion_bottle_digSpeed"
    },
    {
      "name": "mc/items/potion_bottle_drinkable",
      "path": "textures/items/potion_bottle_drinkable"
    },
    {
      "name": "mc/items/potion_bottle_empty",
      "path": "textures/items/potion_bottle_empty"
    },
    {
      "name": "mc/items/potion_bottle_fireResistance",
      "path": "textures/items/potion_bottle_fireResistance"
    },
    {
      "name": "mc/items/potion_bottle_harm",
      "path": "textures/items/potion_bottle_harm"
    },
    {
      "name": "mc/items/potion_bottle_heal",
      "path": "textures/items/potion_bottle_heal"
    },
    {
      "name": "mc/items/potion_bottle_healthBoost",
      "path": "textures/items/potion_bottle_healthBoost"
    },
    {
      "name": "mc/items/potion_bottle_hunger",
      "path": "textures/items/potion_bottle_hunger"
    },
    {
      "name": "mc/items/potion_bottle_invisibility",
      "path": "textures/items/potion_bottle_invisibility"
    },
    {
      "name": "mc/items/potion_bottle_jump",
      "path": "textures/items/potion_bottle_jump"
    },
    {
      "name": "mc/items/potion_bottle_levitation",
      "path": "textures/items/potion_bottle_levitation"
    },
    {
      "name": "mc/items/potion_bottle_lingering",
      "path": "textures/items/potion_bottle_lingering"
    },
    {
      "name": "mc/items/potion_bottle_lingering_damageBoost",
      "path": "textures/items/potion_bottle_lingering_damageBoost"
    },
    {
      "name": "mc/items/potion_bottle_lingering_empty",
      "path": "textures/items/potion_bottle_lingering_empty"
    },
    {
      "name": "mc/items/potion_bottle_lingering_fireResistance",
      "path": "textures/items/potion_bottle_lingering_fireResistance"
    },
    {
      "name": "mc/items/potion_bottle_lingering_harm",
      "path": "textures/items/potion_bottle_lingering_harm"
    },
    {
      "name": "mc/items/potion_bottle_lingering_heal",
      "path": "textures/items/potion_bottle_lingering_heal"
    },
    {
      "name": "mc/items/potion_bottle_lingering_invisibility",
      "path": "textures/items/potion_bottle_lingering_invisibility"
    },
    {
      "name": "mc/items/potion_bottle_lingering_jump",
      "path": "textures/items/potion_bottle_lingering_jump"
    },
    {
      "name": "mc/items/potion_bottle_lingering_luck",
      "path": "textures/items/potion_bottle_lingering_luck"
    },
    {
      "name": "mc/items/potion_bottle_lingering_moveSlowdown",
      "path": "textures/items/potion_bottle_lingering_moveSlowdown"
    },
    {
      "name": "mc/items/potion_bottle_lingering_moveSpeed",
      "path": "textures/items/potion_bottle_lingering_moveSpeed"
    },
    {
      "name": "mc/items/potion_bottle_lingering_nightVision",
      "path": "textures/items/potion_bottle_lingering_nightVision"
    },
    {
      "name": "mc/items/potion_bottle_lingering_poison",
      "path": "textures/items/potion_bottle_lingering_poison"
    },
    {
      "name": "mc/items/potion_bottle_lingering_regeneration",
      "path": "textures/items/potion_bottle_lingering_regeneration"
    },
    {
      "name": "mc/items/potion_bottle_lingering_slowFall",
      "path": "textures/items/potion_bottle_lingering_slowFall"
    },
    {
      "name": "mc/items/potion_bottle_lingering_turtleMaster",
      "path": "textures/items/potion_bottle_lingering_turtleMaster"
    },
    {
      "name": "mc/items/potion_bottle_lingering_waterBreathing",
      "path": "textures/items/potion_bottle_lingering_waterBreathing"
    },
    {
      "name": "mc/items/potion_bottle_lingering_weakness",
      "path": "textures/items/potion_bottle_lingering_weakness"
    },
    {
      "name": "mc/items/potion_bottle_lingering_wither",
      "path": "textures/items/potion_bottle_lingering_wither"
    },
    {
      "name": "mc/items/potion_bottle_moveSlowdown",
      "path": "textures/items/potion_bottle_moveSlowdown"
    },
    {
      "name": "mc/items/potion_bottle_moveSpeed",
      "path": "textures/items/potion_bottle_moveSpeed"
    },
    {
      "name": "mc/items/potion_bottle_nightVision",
      "path": "textures/items/potion_bottle_nightVision"
    },
    {
      "name": "mc/items/potion_bottle_poison",
      "path": "textures/items/potion_bottle_poison"
    },
    {
      "name": "mc/items/potion_bottle_regeneration",
      "path": "textures/items/potion_bottle_regeneration"
    },
    {
      "name": "mc/items/potion_bottle_resistance",
      "path": "textures/items/potion_bottle_resistance"
    },
    {
      "name": "mc/items/potion_bottle_saturation",
      "path": "textures/items/potion_bottle_saturation"
    },
    {
      "name": "mc/items/potion_bottle_slowFall",
      "path": "textures/items/potion_bottle_slowFall"
    },
    {
      "name": "mc/items/potion_bottle_splash",
      "path": "textures/items/potion_bottle_splash"
    },
    {
      "name": "mc/items/potion_bottle_splash_absorption",
      "path": "textures/items/potion_bottle_splash_absorption"
    },
    {
      "name": "mc/items/potion_bottle_splash_blindness",
      "path": "textures/items/potion_bottle_splash_blindness"
    },
    {
      "name": "mc/items/potion_bottle_splash_confusion",
      "path": "textures/items/potion_bottle_splash_confusion"
    },
    {
      "name": "mc/items/potion_bottle_splash_damageBoost",
      "path": "textures/items/potion_bottle_splash_damageBoost"
    },
    {
      "name": "mc/items/potion_bottle_splash_digSlowdown",
      "path": "textures/items/potion_bottle_splash_digSlowdown"
    },
    {
      "name": "mc/items/potion_bottle_splash_digSpeed",
      "path": "textures/items/potion_bottle_splash_digSpeed"
    },
    {
      "name": "mc/items/potion_bottle_splash_fireResistance",
      "path": "textures/items/potion_bottle_splash_fireResistance"
    },
    {
      "name": "mc/items/potion_bottle_splash_harm",
      "path": "textures/items/potion_bottle_splash_harm"
    },
    {
      "name": "mc/items/potion_bottle_splash_heal",
      "path": "textures/items/potion_bottle_splash_heal"
    },
    {
      "name": "mc/items/potion_bottle_splash_healthBoost",
      "path": "textures/items/potion_bottle_splash_healthBoost"
    },
    {
      "name": "mc/items/potion_bottle_splash_hunger",
      "path": "textures/items/potion_bottle_splash_hunger"
    },
    {
      "name": "mc/items/potion_bottle_splash_invisibility",
      "path": "textures/items/potion_bottle_splash_invisibility"
    },
    {
      "name": "mc/items/potion_bottle_splash_jump",
      "path": "textures/items/potion_bottle_splash_jump"
    },
    {
      "name": "mc/items/potion_bottle_splash_levitation",
      "path": "textures/items/potion_bottle_splash_levitation"
    },
    {
      "name": "mc/items/potion_bottle_splash_moveSlowdown",
      "path": "textures/items/potion_bottle_splash_moveSlowdown"
    },
    {
      "name": "mc/items/potion_bottle_splash_moveSpeed",
      "path": "textures/items/potion_bottle_splash_moveSpeed"
    },
    {
      "name": "mc/items/potion_bottle_splash_nightVision",
      "path": "textures/items/potion_bottle_splash_nightVision"
    },
    {
      "name": "mc/items/potion_bottle_splash_poison",
      "path": "textures/items/potion_bottle_splash_poison"
    },
    {
      "name": "mc/items/potion_bottle_splash_regeneration",
      "path": "textures/items/potion_bottle_splash_regeneration"
    },
    {
      "name": "mc/items/potion_bottle_splash_resistance",
      "path": "textures/items/potion_bottle_splash_resistance"
    },
    {
      "name": "mc/items/potion_bottle_splash_saturation",
      "path": "textures/items/potion_bottle_splash_saturation"
    },
    {
      "name": "mc/items/potion_bottle_splash_slowFall",
      "path": "textures/items/potion_bottle_splash_slowFall"
    },
    {
      "name": "mc/items/potion_bottle_splash_turtleMaster",
      "path": "textures/items/potion_bottle_splash_turtleMaster"
    },
    {
      "name": "mc/items/potion_bottle_splash_waterBreathing",
      "path": "textures/items/potion_bottle_splash_waterBreathing"
    },
    {
      "name": "mc/items/potion_bottle_splash_weakness",
      "path": "textures/items/potion_bottle_splash_weakness"
    },
    {
      "name": "mc/items/potion_bottle_splash_wither",
      "path": "textures/items/potion_bottle_splash_wither"
    },
    {
      "name": "mc/items/potion_bottle_turtleMaster",
      "path": "textures/items/potion_bottle_turtleMaster"
    },
    {
      "name": "mc/items/potion_bottle_waterBreathing",
      "path": "textures/items/potion_bottle_waterBreathing"
    },
    {
      "name": "mc/items/potion_bottle_weakness",
      "path": "textures/items/potion_bottle_weakness"
    },
    {
      "name": "mc/items/potion_bottle_wither",
      "path": "textures/items/potion_bottle_wither"
    },
    {
      "name": "mc/items/potion_overlay",
      "path": "textures/items/potion_overlay"
    },
    {
      "name": "mc/items/prismarine_crystals",
      "path": "textures/items/prismarine_crystals"
    },
    {
      "name": "mc/items/prismarine_shard",
      "path": "textures/items/prismarine_shard"
    },
    {
      "name": "mc/items/prize_pottery_sherd",
      "path": "textures/items/prize_pottery_sherd"
    },
    {
      "name": "mc/items/pumpkin_pie",
      "path": "textures/items/pumpkin_pie"
    },
    {
      "name": "mc/items/quartz",
      "path": "textures/items/quartz"
    },
    {
      "name": "mc/items/quiver",
      "path": "textures/items/quiver"
    },
    {
      "name": "mc/items/rabbit_cooked",
      "path": "textures/items/rabbit_cooked"
    },
    {
      "name": "mc/items/rabbit_foot",
      "path": "textures/items/rabbit_foot"
    },
    {
      "name": "mc/items/rabbit_hide",
      "path": "textures/items/rabbit_hide"
    },
    {
      "name": "mc/items/rabbit_raw",
      "path": "textures/items/rabbit_raw"
    },
    {
      "name": "mc/items/rabbit_stew",
      "path": "textures/items/rabbit_stew"
    },
    {
      "name": "mc/items/raiser_armor_trim_smithing_template",
      "path": "textures/items/raiser_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/raw_copper",
      "path": "textures/items/raw_copper"
    },
    {
      "name": "mc/items/raw_gold",
      "path": "textures/items/raw_gold"
    },
    {
      "name": "mc/items/raw_iron",
      "path": "textures/items/raw_iron"
    },
    {
      "name": "mc/items/record_11",
      "path": "textures/items/record_11"
    },
    {
      "name": "mc/items/record_13",
      "path": "textures/items/record_13"
    },
    {
      "name": "mc/items/record_5",
      "path": "textures/items/record_5"
    },
    {
      "name": "mc/items/record_blocks",
      "path": "textures/items/record_blocks"
    },
    {
      "name": "mc/items/record_cat",
      "path": "textures/items/record_cat"
    },
    {
      "name": "mc/items/record_chirp",
      "path": "textures/items/record_chirp"
    },
    {
      "name": "mc/items/record_far",
      "path": "textures/items/record_far"
    },
    {
      "name": "mc/items/record_mall",
      "path": "textures/items/record_mall"
    },
    {
      "name": "mc/items/record_mellohi",
      "path": "textures/items/record_mellohi"
    },
    {
      "name": "mc/items/record_otherside",
      "path": "textures/items/record_otherside"
    },
    {
      "name": "mc/items/record_pigstep",
      "path": "textures/items/record_pigstep"
    },
    {
      "name": "mc/items/record_stal",
      "path": "textures/items/record_stal"
    },
    {
      "name": "mc/items/record_strad",
      "path": "textures/items/record_strad"
    },
    {
      "name": "mc/items/record_wait",
      "path": "textures/items/record_wait"
    },
    {
      "name": "mc/items/record_ward",
      "path": "textures/items/record_ward"
    },
    {
      "name": "mc/items/recovery_compass_atlas",
      "path": "textures/items/recovery_compass_atlas"
    },
    {
      "name": "mc/items/recovery_compass_item",
      "path": "textures/items/recovery_compass_item"
    },
    {
      "name": "mc/items/redstone_dust",
      "path": "textures/items/redstone_dust"
    },
    {
      "name": "mc/items/reeds",
      "path": "textures/items/reeds"
    },
    {
      "name": "mc/items/repeater",
      "path": "textures/items/repeater"
    },
    {
      "name": "mc/items/rib_armor_trim_smithing_template",
      "path": "textures/items/rib_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/rotten_flesh",
      "path": "textures/items/rotten_flesh"
    },
    {
      "name": "mc/items/ruby",
      "path": "textures/items/ruby"
    },
    {
      "name": "mc/items/saddle",
      "path": "textures/items/saddle"
    },
    {
      "name": "mc/items/sea_pickle",
      "path": "textures/items/sea_pickle"
    },
    {
      "name": "mc/items/seeds_beetroot",
      "path": "textures/items/seeds_beetroot"
    },
    {
      "name": "mc/items/seeds_melon",
      "path": "textures/items/seeds_melon"
    },
    {
      "name": "mc/items/seeds_pumpkin",
      "path": "textures/items/seeds_pumpkin"
    },
    {
      "name": "mc/items/seeds_wheat",
      "path": "textures/items/seeds_wheat"
    },
    {
      "name": "mc/items/sentry_armor_trim_smithing_template",
      "path": "textures/items/sentry_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/shaper_armor_trim_smithing_template",
      "path": "textures/items/shaper_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/sheaf_pottery_sherd",
      "path": "textures/items/sheaf_pottery_sherd"
    },
    {
      "name": "mc/items/shears",
      "path": "textures/items/shears"
    },
    {
      "name": "mc/items/shelter_pottery_sherd",
      "path": "textures/items/shelter_pottery_sherd"
    },
    {
      "name": "mc/items/shulker_shell",
      "path": "textures/items/shulker_shell"
    },
    {
      "name": "mc/items/sign",
      "path": "textures/items/sign"
    },
    {
      "name": "mc/items/sign_acacia",
      "path": "textures/items/sign_acacia"
    },
    {
      "name": "mc/items/sign_birch",
      "path": "textures/items/sign_birch"
    },
    {
      "name": "mc/items/sign_crimson",
      "path": "textures/items/sign_crimson"
    },
    {
      "name": "mc/items/sign_darkoak",
      "path": "textures/items/sign_darkoak"
    },
    {
      "name": "mc/items/sign_jungle",
      "path": "textures/items/sign_jungle"
    },
    {
      "name": "mc/items/sign_spruce",
      "path": "textures/items/sign_spruce"
    },
    {
      "name": "mc/items/sign_warped",
      "path": "textures/items/sign_warped"
    },
    {
      "name": "mc/items/silence_armor_trim_smithing_template",
      "path": "textures/items/silence_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/skull_pottery_sherd",
      "path": "textures/items/skull_pottery_sherd"
    },
    {
      "name": "mc/items/slimeball",
      "path": "textures/items/slimeball"
    },
    {
      "name": "mc/items/sniffer_egg",
      "path": "textures/items/sniffer_egg"
    },
    {
      "name": "mc/items/snort_pottery_sherd",
      "path": "textures/items/snort_pottery_sherd"
    },
    {
      "name": "mc/items/snout_armor_trim_smithing_template",
      "path": "textures/items/snout_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/snowball",
      "path": "textures/items/snowball"
    },
    {
      "name": "mc/items/soul_campfire",
      "path": "textures/items/soul_campfire"
    },
    {
      "name": "mc/items/soul_lantern",
      "path": "textures/items/soul_lantern"
    },
    {
      "name": "mc/items/spawn_egg",
      "path": "textures/items/spawn_egg"
    },
    {
      "name": "mc/items/spawn_egg_overlay",
      "path": "textures/items/spawn_egg_overlay"
    },
    {
      "name": "mc/items/spider_eye",
      "path": "textures/items/spider_eye"
    },
    {
      "name": "mc/items/spider_eye_fermented",
      "path": "textures/items/spider_eye_fermented"
    },
    {
      "name": "mc/items/spire_armor_trim_smithing_template",
      "path": "textures/items/spire_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/spruce_chest_boat",
      "path": "textures/items/spruce_chest_boat"
    },
    {
      "name": "mc/items/spruce_hanging_sign",
      "path": "textures/items/spruce_hanging_sign"
    },
    {
      "name": "mc/items/spyglass",
      "path": "textures/items/spyglass"
    },
    {
      "name": "mc/items/stick",
      "path": "textures/items/stick"
    },
    {
      "name": "mc/items/stone_axe",
      "path": "textures/items/stone_axe"
    },
    {
      "name": "mc/items/stone_hoe",
      "path": "textures/items/stone_hoe"
    },
    {
      "name": "mc/items/stone_pickaxe",
      "path": "textures/items/stone_pickaxe"
    },
    {
      "name": "mc/items/stone_shovel",
      "path": "textures/items/stone_shovel"
    },
    {
      "name": "mc/items/stone_sword",
      "path": "textures/items/stone_sword"
    },
    {
      "name": "mc/items/string",
      "path": "textures/items/string"
    },
    {
      "name": "mc/items/sugar",
      "path": "textures/items/sugar"
    },
    {
      "name": "mc/items/suspicious_stew",
      "path": "textures/items/suspicious_stew"
    },
    {
      "name": "mc/items/sweet_berries",
      "path": "textures/items/sweet_berries"
    },
    {
      "name": "mc/items/tide_armor_trim_smithing_template",
      "path": "textures/items/tide_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/tipped_arrow",
      "path": "textures/items/tipped_arrow"
    },
    {
      "name": "mc/items/tipped_arrow_base",
      "path": "textures/items/tipped_arrow_base"
    },
    {
      "name": "mc/items/tipped_arrow_fireres",
      "path": "textures/items/tipped_arrow_fireres"
    },
    {
      "name": "mc/items/tipped_arrow_harm",
      "path": "textures/items/tipped_arrow_harm"
    },
    {
      "name": "mc/items/tipped_arrow_head",
      "path": "textures/items/tipped_arrow_head"
    },
    {
      "name": "mc/items/tipped_arrow_healing",
      "path": "textures/items/tipped_arrow_healing"
    },
    {
      "name": "mc/items/tipped_arrow_invisibility",
      "path": "textures/items/tipped_arrow_invisibility"
    },
    {
      "name": "mc/items/tipped_arrow_leaping",
      "path": "textures/items/tipped_arrow_leaping"
    },
    {
      "name": "mc/items/tipped_arrow_luck",
      "path": "textures/items/tipped_arrow_luck"
    },
    {
      "name": "mc/items/tipped_arrow_nightvision",
      "path": "textures/items/tipped_arrow_nightvision"
    },
    {
      "name": "mc/items/tipped_arrow_poison",
      "path": "textures/items/tipped_arrow_poison"
    },
    {
      "name": "mc/items/tipped_arrow_regen",
      "path": "textures/items/tipped_arrow_regen"
    },
    {
      "name": "mc/items/tipped_arrow_slow",
      "path": "textures/items/tipped_arrow_slow"
    },
    {
      "name": "mc/items/tipped_arrow_slowfalling",
      "path": "textures/items/tipped_arrow_slowfalling"
    },
    {
      "name": "mc/items/tipped_arrow_strength",
      "path": "textures/items/tipped_arrow_strength"
    },
    {
      "name": "mc/items/tipped_arrow_swift",
      "path": "textures/items/tipped_arrow_swift"
    },
    {
      "name": "mc/items/tipped_arrow_turtlemaster",
      "path": "textures/items/tipped_arrow_turtlemaster"
    },
    {
      "name": "mc/items/tipped_arrow_waterbreathing",
      "path": "textures/items/tipped_arrow_waterbreathing"
    },
    {
      "name": "mc/items/tipped_arrow_weakness",
      "path": "textures/items/tipped_arrow_weakness"
    },
    {
      "name": "mc/items/tipped_arrow_wither",
      "path": "textures/items/tipped_arrow_wither"
    },
    {
      "name": "mc/items/torchflower_seeds",
      "path": "textures/items/torchflower_seeds"
    },
    {
      "name": "mc/items/totem",
      "path": "textures/items/totem"
    },
    {
      "name": "mc/items/trident",
      "path": "textures/items/trident"
    },
    {
      "name": "mc/items/turtle_egg",
      "path": "textures/items/turtle_egg"
    },
    {
      "name": "mc/items/turtle_helmet",
      "path": "textures/items/turtle_helmet"
    },
    {
      "name": "mc/items/turtle_shell_piece",
      "path": "textures/items/turtle_shell_piece"
    },
    {
      "name": "mc/items/vex_armor_trim_smithing_template",
      "path": "textures/items/vex_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/villagebell",
      "path": "textures/items/villagebell"
    },
    {
      "name": "mc/items/ward_armor_trim_smithing_template",
      "path": "textures/items/ward_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/warped_door",
      "path": "textures/items/warped_door"
    },
    {
      "name": "mc/items/warped_fungus_on_a_stick",
      "path": "textures/items/warped_fungus_on_a_stick"
    },
    {
      "name": "mc/items/warped_hanging_sign",
      "path": "textures/items/warped_hanging_sign"
    },
    {
      "name": "mc/items/watch_atlas",
      "path": "textures/items/watch_atlas"
    },
    {
      "name": "mc/items/wayfinder_armor_trim_smithing_template",
      "path": "textures/items/wayfinder_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/wheat",
      "path": "textures/items/wheat"
    },
    {
      "name": "mc/items/wild_armor_trim_smithing_template",
      "path": "textures/items/wild_armor_trim_smithing_template"
    },
    {
      "name": "mc/items/wood_axe",
      "path": "textures/items/wood_axe"
    },
    {
      "name": "mc/items/wood_hoe",
      "path": "textures/items/wood_hoe"
    },
    {
      "name": "mc/items/wood_pickaxe",
      "path": "textures/items/wood_pickaxe"
    },
    {
      "name": "mc/items/wood_shovel",
      "path": "textures/items/wood_shovel"
    },
    {
      "name": "mc/items/wood_sword",
      "path": "textures/items/wood_sword"
    },
    {
      "name": "mc/ui/5stars_empty",
      "path": "textures/ui/5stars_empty"
    },
    {
      "name": "mc/ui/5stars_empty_new",
      "path": "textures/ui/5stars_empty_new"
    },
    {
      "name": "mc/ui/5stars_empty_white",
      "path": "textures/ui/5stars_empty_white"
    },
    {
      "name": "mc/ui/5stars_full",
      "path": "textures/ui/5stars_full"
    },
    {
      "name": "mc/ui/5stars_full_new",
      "path": "textures/ui/5stars_full_new"
    },
    {
      "name": "mc/ui/absorption_effect",
      "path": "textures/ui/absorption_effect"
    },
    {
      "name": "mc/ui/absorption_heart",
      "path": "textures/ui/absorption_heart"
    },
    {
      "name": "mc/ui/absorption_heart_half",
      "path": "textures/ui/absorption_heart_half"
    },
    {
      "name": "mc/ui/accessibility_glyph",
      "path": "textures/ui/accessibility_glyph"
    },
    {
      "name": "mc/ui/accessibility_glyph_color",
      "path": "textures/ui/accessibility_glyph_color"
    },
    {
      "name": "mc/ui/achievements",
      "path": "textures/ui/achievements"
    },
    {
      "name": "mc/ui/achievements_g",
      "path": "textures/ui/achievements_g"
    },
    {
      "name": "mc/ui/achievement_locked_icon",
      "path": "textures/ui/achievement_locked_icon"
    },
    {
      "name": "mc/ui/addServer",
      "path": "textures/ui/addServer"
    },
    {
      "name": "mc/ui/anvil-plus",
      "path": "textures/ui/anvil-plus"
    },
    {
      "name": "mc/ui/anvil_icon",
      "path": "textures/ui/anvil_icon"
    },
    {
      "name": "mc/ui/armors_and_tools_slot_overlay",
      "path": "textures/ui/armors_and_tools_slot_overlay"
    },
    {
      "name": "mc/ui/armors_slot_overlay",
      "path": "textures/ui/armors_slot_overlay"
    },
    {
      "name": "mc/ui/armor_empty",
      "path": "textures/ui/armor_empty"
    },
    {
      "name": "mc/ui/armor_full",
      "path": "textures/ui/armor_full"
    },
    {
      "name": "mc/ui/armor_half",
      "path": "textures/ui/armor_half"
    },
    {
      "name": "mc/ui/arrow",
      "path": "textures/ui/arrow"
    },
    {
      "name": "mc/ui/arrowDown",
      "path": "textures/ui/arrowDown"
    },
    {
      "name": "mc/ui/arrowLeft",
      "path": "textures/ui/arrowLeft"
    },
    {
      "name": "mc/ui/arrowRight",
      "path": "textures/ui/arrowRight"
    },
    {
      "name": "mc/ui/arrow_active",
      "path": "textures/ui/arrow_active"
    },
    {
      "name": "mc/ui/arrow_dark_left_stretch",
      "path": "textures/ui/arrow_dark_left_stretch"
    },
    {
      "name": "mc/ui/arrow_dark_right",
      "path": "textures/ui/arrow_dark_right"
    },
    {
      "name": "mc/ui/arrow_dark_right_stretch",
      "path": "textures/ui/arrow_dark_right_stretch"
    },
    {
      "name": "mc/ui/arrow_down",
      "path": "textures/ui/arrow_down"
    },
    {
      "name": "mc/ui/arrow_down_large",
      "path": "textures/ui/arrow_down_large"
    },
    {
      "name": "mc/ui/arrow_down_small",
      "path": "textures/ui/arrow_down_small"
    },
    {
      "name": "mc/ui/arrow_icon",
      "path": "textures/ui/arrow_icon"
    },
    {
      "name": "mc/ui/arrow_inactive",
      "path": "textures/ui/arrow_inactive"
    },
    {
      "name": "mc/ui/arrow_large",
      "path": "textures/ui/arrow_large"
    },
    {
      "name": "mc/ui/arrow_left",
      "path": "textures/ui/arrow_left"
    },
    {
      "name": "mc/ui/arrow_left_white",
      "path": "textures/ui/arrow_left_white"
    },
    {
      "name": "mc/ui/arrow_l_default",
      "path": "textures/ui/arrow_l_default"
    },
    {
      "name": "mc/ui/arrow_l_hover",
      "path": "textures/ui/arrow_l_hover"
    },
    {
      "name": "mc/ui/arrow_l_pressed",
      "path": "textures/ui/arrow_l_pressed"
    },
    {
      "name": "mc/ui/arrow_right",
      "path": "textures/ui/arrow_right"
    },
    {
      "name": "mc/ui/arrow_right_white",
      "path": "textures/ui/arrow_right_white"
    },
    {
      "name": "mc/ui/arrow_r_default",
      "path": "textures/ui/arrow_r_default"
    },
    {
      "name": "mc/ui/arrow_r_hover",
      "path": "textures/ui/arrow_r_hover"
    },
    {
      "name": "mc/ui/arrow_r_pressed",
      "path": "textures/ui/arrow_r_pressed"
    },
    {
      "name": "mc/ui/attack",
      "path": "textures/ui/attack"
    },
    {
      "name": "mc/ui/attack_pressed",
      "path": "textures/ui/attack_pressed"
    },
    {
      "name": "mc/ui/automation_glyph",
      "path": "textures/ui/automation_glyph"
    },
    {
      "name": "mc/ui/automation_glyph_color",
      "path": "textures/ui/automation_glyph_color"
    },
    {
      "name": "mc/ui/auto_save",
      "path": "textures/ui/auto_save"
    },
    {
      "name": "mc/ui/background",
      "path": "textures/ui/background"
    },
    {
      "name": "mc/ui/background_image",
      "path": "textures/ui/background_image"
    },
    {
      "name": "mc/ui/background_indent_no_top",
      "path": "textures/ui/background_indent_no_top"
    },
    {
      "name": "mc/ui/background_panel",
      "path": "textures/ui/background_panel"
    },
    {
      "name": "mc/ui/background_with_border",
      "path": "textures/ui/background_with_border"
    },
    {
      "name": "mc/ui/backup_noline",
      "path": "textures/ui/backup_noline"
    },
    {
      "name": "mc/ui/backup_outline",
      "path": "textures/ui/backup_outline"
    },
    {
      "name": "mc/ui/backup_replace",
      "path": "textures/ui/backup_replace"
    },
    {
      "name": "mc/ui/back_button_default",
      "path": "textures/ui/back_button_default"
    },
    {
      "name": "mc/ui/back_button_hover",
      "path": "textures/ui/back_button_hover"
    },
    {
      "name": "mc/ui/back_button_pressed",
      "path": "textures/ui/back_button_pressed"
    },
    {
      "name": "mc/ui/badge_ve",
      "path": "textures/ui/badge_ve"
    },
    {
      "name": "mc/ui/bad_omen_effect",
      "path": "textures/ui/bad_omen_effect"
    },
    {
      "name": "mc/ui/bamboo_sign",
      "path": "textures/ui/bamboo_sign"
    },
    {
      "name": "mc/ui/bang_icon",
      "path": "textures/ui/bang_icon"
    },
    {
      "name": "mc/ui/Banners",
      "path": "textures/ui/Banners"
    },
    {
      "name": "mc/ui/BannersLight",
      "path": "textures/ui/BannersLight"
    },
    {
      "name": "mc/ui/BannersTransparent",
      "path": "textures/ui/BannersTransparent"
    },
    {
      "name": "mc/ui/banners_dark",
      "path": "textures/ui/banners_dark"
    },
    {
      "name": "mc/ui/banners_no_border",
      "path": "textures/ui/banners_no_border"
    },
    {
      "name": "mc/ui/banners_no_border_dark_hover",
      "path": "textures/ui/banners_no_border_dark_hover"
    },
    {
      "name": "mc/ui/banner_legends",
      "path": "textures/ui/banner_legends"
    },
    {
      "name": "mc/ui/banner_mob_vote",
      "path": "textures/ui/banner_mob_vote"
    },
    {
      "name": "mc/ui/banner_piglin",
      "path": "textures/ui/banner_piglin"
    },
    {
      "name": "mc/ui/barely_visible_creeper",
      "path": "textures/ui/barely_visible_creeper"
    },
    {
      "name": "mc/ui/beacon_button_default",
      "path": "textures/ui/beacon_button_default"
    },
    {
      "name": "mc/ui/beacon_button_hover",
      "path": "textures/ui/beacon_button_hover"
    },
    {
      "name": "mc/ui/beacon_button_locked",
      "path": "textures/ui/beacon_button_locked"
    },
    {
      "name": "mc/ui/beacon_button_pressed",
      "path": "textures/ui/beacon_button_pressed"
    },
    {
      "name": "mc/ui/beacon_default_button_pocket",
      "path": "textures/ui/beacon_default_button_pocket"
    },
    {
      "name": "mc/ui/beacon_item_seperator_pocket",
      "path": "textures/ui/beacon_item_seperator_pocket"
    },
    {
      "name": "mc/ui/beacon_selected_button_pocket",
      "path": "textures/ui/beacon_selected_button_pocket"
    },
    {
      "name": "mc/ui/bg32",
      "path": "textures/ui/bg32"
    },
    {
      "name": "mc/ui/black-arrow",
      "path": "textures/ui/black-arrow"
    },
    {
      "name": "mc/ui/Black",
      "path": "textures/ui/Black"
    },
    {
      "name": "mc/ui/blackline",
      "path": "textures/ui/blackline"
    },
    {
      "name": "mc/ui/black_border",
      "path": "textures/ui/black_border"
    },
    {
      "name": "mc/ui/blindness_effect",
      "path": "textures/ui/blindness_effect"
    },
    {
      "name": "mc/ui/blue_info_glyph",
      "path": "textures/ui/blue_info_glyph"
    },
    {
      "name": "mc/ui/bonus_banner",
      "path": "textures/ui/bonus_banner"
    },
    {
      "name": "mc/ui/bookshelf_flat",
      "path": "textures/ui/bookshelf_flat"
    },
    {
      "name": "mc/ui/bookshelf_flat_border",
      "path": "textures/ui/bookshelf_flat_border"
    },
    {
      "name": "mc/ui/book_addpicture_default",
      "path": "textures/ui/book_addpicture_default"
    },
    {
      "name": "mc/ui/book_addpicture_hover",
      "path": "textures/ui/book_addpicture_hover"
    },
    {
      "name": "mc/ui/book_addpicture_pressed",
      "path": "textures/ui/book_addpicture_pressed"
    },
    {
      "name": "mc/ui/book_addtextpage_default",
      "path": "textures/ui/book_addtextpage_default"
    },
    {
      "name": "mc/ui/book_addtextpage_hover",
      "path": "textures/ui/book_addtextpage_hover"
    },
    {
      "name": "mc/ui/book_addtextpage_pressed",
      "path": "textures/ui/book_addtextpage_pressed"
    },
    {
      "name": "mc/ui/book_arrowleft_default",
      "path": "textures/ui/book_arrowleft_default"
    },
    {
      "name": "mc/ui/book_arrowleft_hover",
      "path": "textures/ui/book_arrowleft_hover"
    },
    {
      "name": "mc/ui/book_arrowleft_pressed",
      "path": "textures/ui/book_arrowleft_pressed"
    },
    {
      "name": "mc/ui/book_arrowright_default",
      "path": "textures/ui/book_arrowright_default"
    },
    {
      "name": "mc/ui/book_arrowright_hover",
      "path": "textures/ui/book_arrowright_hover"
    },
    {
      "name": "mc/ui/book_arrowright_pressed",
      "path": "textures/ui/book_arrowright_pressed"
    },
    {
      "name": "mc/ui/book_back",
      "path": "textures/ui/book_back"
    },
    {
      "name": "mc/ui/book_binding",
      "path": "textures/ui/book_binding"
    },
    {
      "name": "mc/ui/book_cover",
      "path": "textures/ui/book_cover"
    },
    {
      "name": "mc/ui/book_edit_default",
      "path": "textures/ui/book_edit_default"
    },
    {
      "name": "mc/ui/book_edit_hover",
      "path": "textures/ui/book_edit_hover"
    },
    {
      "name": "mc/ui/book_edit_pressed",
      "path": "textures/ui/book_edit_pressed"
    },
    {
      "name": "mc/ui/book_frame",
      "path": "textures/ui/book_frame"
    },
    {
      "name": "mc/ui/book_metatag_default",
      "path": "textures/ui/book_metatag_default"
    },
    {
      "name": "mc/ui/book_metatag_hover",
      "path": "textures/ui/book_metatag_hover"
    },
    {
      "name": "mc/ui/book_metatag_pressed",
      "path": "textures/ui/book_metatag_pressed"
    },
    {
      "name": "mc/ui/book_pagecrease_left",
      "path": "textures/ui/book_pagecrease_left"
    },
    {
      "name": "mc/ui/book_pagecrease_right",
      "path": "textures/ui/book_pagecrease_right"
    },
    {
      "name": "mc/ui/book_pageedge_left",
      "path": "textures/ui/book_pageedge_left"
    },
    {
      "name": "mc/ui/book_pageedge_right",
      "path": "textures/ui/book_pageedge_right"
    },
    {
      "name": "mc/ui/book_pageleft_default",
      "path": "textures/ui/book_pageleft_default"
    },
    {
      "name": "mc/ui/book_pageleft_hover",
      "path": "textures/ui/book_pageleft_hover"
    },
    {
      "name": "mc/ui/book_pageleft_pressed",
      "path": "textures/ui/book_pageleft_pressed"
    },
    {
      "name": "mc/ui/book_pageright_default",
      "path": "textures/ui/book_pageright_default"
    },
    {
      "name": "mc/ui/book_pageright_hover",
      "path": "textures/ui/book_pageright_hover"
    },
    {
      "name": "mc/ui/book_pageright_pressed",
      "path": "textures/ui/book_pageright_pressed"
    },
    {
      "name": "mc/ui/book_shiftleft_default",
      "path": "textures/ui/book_shiftleft_default"
    },
    {
      "name": "mc/ui/book_shiftleft_hover",
      "path": "textures/ui/book_shiftleft_hover"
    },
    {
      "name": "mc/ui/book_shiftleft_pressed",
      "path": "textures/ui/book_shiftleft_pressed"
    },
    {
      "name": "mc/ui/book_shiftright_default",
      "path": "textures/ui/book_shiftright_default"
    },
    {
      "name": "mc/ui/book_shiftright_hover",
      "path": "textures/ui/book_shiftright_hover"
    },
    {
      "name": "mc/ui/book_shiftright_pressed",
      "path": "textures/ui/book_shiftright_pressed"
    },
    {
      "name": "mc/ui/book_spine",
      "path": "textures/ui/book_spine"
    },
    {
      "name": "mc/ui/book_texteditbox_hover",
      "path": "textures/ui/book_texteditbox_hover"
    },
    {
      "name": "mc/ui/book_trash_default",
      "path": "textures/ui/book_trash_default"
    },
    {
      "name": "mc/ui/bottle_empty",
      "path": "textures/ui/bottle_empty"
    },
    {
      "name": "mc/ui/box_number_grey",
      "path": "textures/ui/box_number_grey"
    },
    {
      "name": "mc/ui/break",
      "path": "textures/ui/break"
    },
    {
      "name": "mc/ui/brewing_arrow_empty",
      "path": "textures/ui/brewing_arrow_empty"
    },
    {
      "name": "mc/ui/brewing_arrow_full",
      "path": "textures/ui/brewing_arrow_full"
    },
    {
      "name": "mc/ui/brewing_arrow_large_empty",
      "path": "textures/ui/brewing_arrow_large_empty"
    },
    {
      "name": "mc/ui/brewing_arrow_large_full",
      "path": "textures/ui/brewing_arrow_large_full"
    },
    {
      "name": "mc/ui/brewing_fuel_bar_empty",
      "path": "textures/ui/brewing_fuel_bar_empty"
    },
    {
      "name": "mc/ui/brewing_fuel_bar_full",
      "path": "textures/ui/brewing_fuel_bar_full"
    },
    {
      "name": "mc/ui/brewing_fuel_empty",
      "path": "textures/ui/brewing_fuel_empty"
    },
    {
      "name": "mc/ui/brewing_fuel_pipes",
      "path": "textures/ui/brewing_fuel_pipes"
    },
    {
      "name": "mc/ui/brewing_pipes",
      "path": "textures/ui/brewing_pipes"
    },
    {
      "name": "mc/ui/brewing_pipes_large",
      "path": "textures/ui/brewing_pipes_large"
    },
    {
      "name": "mc/ui/broadcast_glyph",
      "path": "textures/ui/broadcast_glyph"
    },
    {
      "name": "mc/ui/broadcast_glyph_color",
      "path": "textures/ui/broadcast_glyph_color"
    },
    {
      "name": "mc/ui/bubble",
      "path": "textures/ui/bubble"
    },
    {
      "name": "mc/ui/bubbles_empty",
      "path": "textures/ui/bubbles_empty"
    },
    {
      "name": "mc/ui/bubbles_full",
      "path": "textures/ui/bubbles_full"
    },
    {
      "name": "mc/ui/bubbles_left_corner",
      "path": "textures/ui/bubbles_left_corner"
    },
    {
      "name": "mc/ui/bubbles_right_corner",
      "path": "textures/ui/bubbles_right_corner"
    },
    {
      "name": "mc/ui/bubble_pop",
      "path": "textures/ui/bubble_pop"
    },
    {
      "name": "mc/ui/bundle_wide_tile",
      "path": "textures/ui/bundle_wide_tile"
    },
    {
      "name": "mc/ui/button_borderless_dark",
      "path": "textures/ui/button_borderless_dark"
    },
    {
      "name": "mc/ui/button_borderless_darkhover",
      "path": "textures/ui/button_borderless_darkhover"
    },
    {
      "name": "mc/ui/button_borderless_darkpressed",
      "path": "textures/ui/button_borderless_darkpressed"
    },
    {
      "name": "mc/ui/button_borderless_darkpressednohover",
      "path": "textures/ui/button_borderless_darkpressednohover"
    },
    {
      "name": "mc/ui/button_borderless_imagelesshoverbg",
      "path": "textures/ui/button_borderless_imagelesshoverbg"
    },
    {
      "name": "mc/ui/button_borderless_light",
      "path": "textures/ui/button_borderless_light"
    },
    {
      "name": "mc/ui/button_borderless_lighthover",
      "path": "textures/ui/button_borderless_lighthover"
    },
    {
      "name": "mc/ui/button_borderless_lightpressed",
      "path": "textures/ui/button_borderless_lightpressed"
    },
    {
      "name": "mc/ui/button_borderless_lightpressednohover",
      "path": "textures/ui/button_borderless_lightpressednohover"
    },
    {
      "name": "mc/ui/button_border_dark",
      "path": "textures/ui/button_border_dark"
    },
    {
      "name": "mc/ui/button_border_light",
      "path": "textures/ui/button_border_light"
    },
    {
      "name": "mc/ui/button_border_light_bottom_right",
      "path": "textures/ui/button_border_light_bottom_right"
    },
    {
      "name": "mc/ui/button_dark_color",
      "path": "textures/ui/button_dark_color"
    },
    {
      "name": "mc/ui/button_inside_dark",
      "path": "textures/ui/button_inside_dark"
    },
    {
      "name": "mc/ui/button_purple",
      "path": "textures/ui/button_purple"
    },
    {
      "name": "mc/ui/button_red",
      "path": "textures/ui/button_red"
    },
    {
      "name": "mc/ui/button_red_pressed",
      "path": "textures/ui/button_red_pressed"
    },
    {
      "name": "mc/ui/button_trade_red",
      "path": "textures/ui/button_trade_red"
    },
    {
      "name": "mc/ui/button_trade_red_pressed",
      "path": "textures/ui/button_trade_red_pressed"
    },
    {
      "name": "mc/ui/buy_now_hover",
      "path": "textures/ui/buy_now_hover"
    },
    {
      "name": "mc/ui/buy_now_normal",
      "path": "textures/ui/buy_now_normal"
    },
    {
      "name": "mc/ui/buy_now_pressed",
      "path": "textures/ui/buy_now_pressed"
    },
    {
      "name": "mc/ui/call_out_header",
      "path": "textures/ui/call_out_header"
    },
    {
      "name": "mc/ui/camera-small",
      "path": "textures/ui/camera-small"
    },
    {
      "name": "mc/ui/camera-yo",
      "path": "textures/ui/camera-yo"
    },
    {
      "name": "mc/ui/cancel",
      "path": "textures/ui/cancel"
    },
    {
      "name": "mc/ui/cartography_table_copy",
      "path": "textures/ui/cartography_table_copy"
    },
    {
      "name": "mc/ui/cartography_table_empty",
      "path": "textures/ui/cartography_table_empty"
    },
    {
      "name": "mc/ui/cartography_table_glass",
      "path": "textures/ui/cartography_table_glass"
    },
    {
      "name": "mc/ui/cartography_table_map",
      "path": "textures/ui/cartography_table_map"
    },
    {
      "name": "mc/ui/cartography_table_zoom",
      "path": "textures/ui/cartography_table_zoom"
    },
    {
      "name": "mc/ui/Caution",
      "path": "textures/ui/Caution"
    },
    {
      "name": "mc/ui/cell_image",
      "path": "textures/ui/cell_image"
    },
    {
      "name": "mc/ui/cell_image_darkgrey",
      "path": "textures/ui/cell_image_darkgrey"
    },
    {
      "name": "mc/ui/cell_image_invert",
      "path": "textures/ui/cell_image_invert"
    },
    {
      "name": "mc/ui/cell_image_lock",
      "path": "textures/ui/cell_image_lock"
    },
    {
      "name": "mc/ui/cell_image_normal",
      "path": "textures/ui/cell_image_normal"
    },
    {
      "name": "mc/ui/cell_image_red",
      "path": "textures/ui/cell_image_red"
    },
    {
      "name": "mc/ui/ChainSquare",
      "path": "textures/ui/ChainSquare"
    },
    {
      "name": "mc/ui/chat_down_arrow",
      "path": "textures/ui/chat_down_arrow"
    },
    {
      "name": "mc/ui/chat_keyboard",
      "path": "textures/ui/chat_keyboard"
    },
    {
      "name": "mc/ui/chat_keyboard_hover",
      "path": "textures/ui/chat_keyboard_hover"
    },
    {
      "name": "mc/ui/chat_send",
      "path": "textures/ui/chat_send"
    },
    {
      "name": "mc/ui/check",
      "path": "textures/ui/check"
    },
    {
      "name": "mc/ui/checkboxFilledYellow",
      "path": "textures/ui/checkboxFilledYellow"
    },
    {
      "name": "mc/ui/checkboxUnFilled",
      "path": "textures/ui/checkboxUnFilled"
    },
    {
      "name": "mc/ui/checkbox_check",
      "path": "textures/ui/checkbox_check"
    },
    {
      "name": "mc/ui/checkbox_checkDisabled",
      "path": "textures/ui/checkbox_checkDisabled"
    },
    {
      "name": "mc/ui/checkbox_checkHover",
      "path": "textures/ui/checkbox_checkHover"
    },
    {
      "name": "mc/ui/checkbox_check_locked",
      "path": "textures/ui/checkbox_check_locked"
    },
    {
      "name": "mc/ui/checkbox_filled",
      "path": "textures/ui/checkbox_filled"
    },
    {
      "name": "mc/ui/checkbox_filled_disabled",
      "path": "textures/ui/checkbox_filled_disabled"
    },
    {
      "name": "mc/ui/checkbox_filled_hover",
      "path": "textures/ui/checkbox_filled_hover"
    },
    {
      "name": "mc/ui/checkbox_space",
      "path": "textures/ui/checkbox_space"
    },
    {
      "name": "mc/ui/checkbox_spaceDisabled",
      "path": "textures/ui/checkbox_spaceDisabled"
    },
    {
      "name": "mc/ui/checkbox_spaceHover",
      "path": "textures/ui/checkbox_spaceHover"
    },
    {
      "name": "mc/ui/checkbox_space_locked",
      "path": "textures/ui/checkbox_space_locked"
    },
    {
      "name": "mc/ui/check_green_white",
      "path": "textures/ui/check_green_white"
    },
    {
      "name": "mc/ui/cherry_sign",
      "path": "textures/ui/cherry_sign"
    },
    {
      "name": "mc/ui/chevron_grey_left",
      "path": "textures/ui/chevron_grey_left"
    },
    {
      "name": "mc/ui/chevron_grey_right",
      "path": "textures/ui/chevron_grey_right"
    },
    {
      "name": "mc/ui/chevron_left",
      "path": "textures/ui/chevron_left"
    },
    {
      "name": "mc/ui/chevron_new_grey_right",
      "path": "textures/ui/chevron_new_grey_right"
    },
    {
      "name": "mc/ui/chevron_new_white_right",
      "path": "textures/ui/chevron_new_white_right"
    },
    {
      "name": "mc/ui/chevron_right",
      "path": "textures/ui/chevron_right"
    },
    {
      "name": "mc/ui/chevron_white_down",
      "path": "textures/ui/chevron_white_down"
    },
    {
      "name": "mc/ui/chevron_white_up",
      "path": "textures/ui/chevron_white_up"
    },
    {
      "name": "mc/ui/classic-button-hover",
      "path": "textures/ui/classic-button-hover"
    },
    {
      "name": "mc/ui/classic-button-pressed",
      "path": "textures/ui/classic-button-pressed"
    },
    {
      "name": "mc/ui/classic-button",
      "path": "textures/ui/classic-button"
    },
    {
      "name": "mc/ui/classic_skin_comp",
      "path": "textures/ui/classic_skin_comp"
    },
    {
      "name": "mc/ui/classrooms_icon",
      "path": "textures/ui/classrooms_icon"
    },
    {
      "name": "mc/ui/clickable_overlay",
      "path": "textures/ui/clickable_overlay"
    },
    {
      "name": "mc/ui/clickable_overlay_inverse",
      "path": "textures/ui/clickable_overlay_inverse"
    },
    {
      "name": "mc/ui/clock",
      "path": "textures/ui/clock"
    },
    {
      "name": "mc/ui/close_button_default",
      "path": "textures/ui/close_button_default"
    },
    {
      "name": "mc/ui/close_button_default_compact",
      "path": "textures/ui/close_button_default_compact"
    },
    {
      "name": "mc/ui/close_button_default_light",
      "path": "textures/ui/close_button_default_light"
    },
    {
      "name": "mc/ui/close_button_hover",
      "path": "textures/ui/close_button_hover"
    },
    {
      "name": "mc/ui/close_button_hover_compact",
      "path": "textures/ui/close_button_hover_compact"
    },
    {
      "name": "mc/ui/close_button_hover_light",
      "path": "textures/ui/close_button_hover_light"
    },
    {
      "name": "mc/ui/close_button_pressed",
      "path": "textures/ui/close_button_pressed"
    },
    {
      "name": "mc/ui/close_button_pressed_compact",
      "path": "textures/ui/close_button_pressed_compact"
    },
    {
      "name": "mc/ui/close_button_pressed_light",
      "path": "textures/ui/close_button_pressed_light"
    },
    {
      "name": "mc/ui/close_X_button",
      "path": "textures/ui/close_X_button"
    },
    {
      "name": "mc/ui/close_X_button_hover",
      "path": "textures/ui/close_X_button_hover"
    },
    {
      "name": "mc/ui/cloud_only_storage",
      "path": "textures/ui/cloud_only_storage"
    },
    {
      "name": "mc/ui/cointier_backdrop",
      "path": "textures/ui/cointier_backdrop"
    },
    {
      "name": "mc/ui/coin_bevel",
      "path": "textures/ui/coin_bevel"
    },
    {
      "name": "mc/ui/coin_button_borderless",
      "path": "textures/ui/coin_button_borderless"
    },
    {
      "name": "mc/ui/coin_button_borderless_pressed",
      "path": "textures/ui/coin_button_borderless_pressed"
    },
    {
      "name": "mc/ui/color_picker",
      "path": "textures/ui/color_picker"
    },
    {
      "name": "mc/ui/color_plus",
      "path": "textures/ui/color_plus"
    },
    {
      "name": "mc/ui/comment",
      "path": "textures/ui/comment"
    },
    {
      "name": "mc/ui/common-classic_hover",
      "path": "textures/ui/common-classic_hover"
    },
    {
      "name": "mc/ui/common-classic_hover_1",
      "path": "textures/ui/common-classic_hover_1"
    },
    {
      "name": "mc/ui/common-classic_toggle_checked_state",
      "path": "textures/ui/common-classic_toggle_checked_state"
    },
    {
      "name": "mc/ui/common-classic_toggle_unchecked_state",
      "path": "textures/ui/common-classic_toggle_unchecked_state"
    },
    {
      "name": "mc/ui/conduit_power_effect",
      "path": "textures/ui/conduit_power_effect"
    },
    {
      "name": "mc/ui/confirm",
      "path": "textures/ui/confirm"
    },
    {
      "name": "mc/ui/control",
      "path": "textures/ui/control"
    },
    {
      "name": "mc/ui/controller_glyph",
      "path": "textures/ui/controller_glyph"
    },
    {
      "name": "mc/ui/controller_glyph_color",
      "path": "textures/ui/controller_glyph_color"
    },
    {
      "name": "mc/ui/controller_glyph_color_switch",
      "path": "textures/ui/controller_glyph_color_switch"
    },
    {
      "name": "mc/ui/controller_glyph_switch",
      "path": "textures/ui/controller_glyph_switch"
    },
    {
      "name": "mc/ui/control_gray",
      "path": "textures/ui/control_gray"
    },
    {
      "name": "mc/ui/control_white",
      "path": "textures/ui/control_white"
    },
    {
      "name": "mc/ui/copy",
      "path": "textures/ui/copy"
    },
    {
      "name": "mc/ui/craft_toggle_off",
      "path": "textures/ui/craft_toggle_off"
    },
    {
      "name": "mc/ui/craft_toggle_off_hover",
      "path": "textures/ui/craft_toggle_off_hover"
    },
    {
      "name": "mc/ui/craft_toggle_on",
      "path": "textures/ui/craft_toggle_on"
    },
    {
      "name": "mc/ui/craft_toggle_on_hover",
      "path": "textures/ui/craft_toggle_on_hover"
    },
    {
      "name": "mc/ui/CreateNewProject",
      "path": "textures/ui/CreateNewProject"
    },
    {
      "name": "mc/ui/CreateNewWorld",
      "path": "textures/ui/CreateNewWorld"
    },
    {
      "name": "mc/ui/creative_icon",
      "path": "textures/ui/creative_icon"
    },
    {
      "name": "mc/ui/creator_glyph",
      "path": "textures/ui/creator_glyph"
    },
    {
      "name": "mc/ui/creator_glyph_color",
      "path": "textures/ui/creator_glyph_color"
    },
    {
      "name": "mc/ui/crossout",
      "path": "textures/ui/crossout"
    },
    {
      "name": "mc/ui/cursor",
      "path": "textures/ui/cursor"
    },
    {
      "name": "mc/ui/cursor_gamecore",
      "path": "textures/ui/cursor_gamecore"
    },
    {
      "name": "mc/ui/cursor_pc",
      "path": "textures/ui/cursor_pc"
    },
    {
      "name": "mc/ui/dark",
      "path": "textures/ui/dark"
    },
    {
      "name": "mc/ui/DarkBannerNoBorder",
      "path": "textures/ui/DarkBannerNoBorder"
    },
    {
      "name": "mc/ui/darkness_effect",
      "path": "textures/ui/darkness_effect"
    },
    {
      "name": "mc/ui/dark_bg",
      "path": "textures/ui/dark_bg"
    },
    {
      "name": "mc/ui/dark_minus",
      "path": "textures/ui/dark_minus"
    },
    {
      "name": "mc/ui/dark_plus",
      "path": "textures/ui/dark_plus"
    },
    {
      "name": "mc/ui/dash_cooldown",
      "path": "textures/ui/dash_cooldown"
    },
    {
      "name": "mc/ui/debug_glyph",
      "path": "textures/ui/debug_glyph"
    },
    {
      "name": "mc/ui/debug_glyph_color",
      "path": "textures/ui/debug_glyph_color"
    },
    {
      "name": "mc/ui/default_indent",
      "path": "textures/ui/default_indent"
    },
    {
      "name": "mc/ui/default_world",
      "path": "textures/ui/default_world"
    },
    {
      "name": "mc/ui/deop",
      "path": "textures/ui/deop"
    },
    {
      "name": "mc/ui/dev_glyph",
      "path": "textures/ui/dev_glyph"
    },
    {
      "name": "mc/ui/dev_glyph_color",
      "path": "textures/ui/dev_glyph_color"
    },
    {
      "name": "mc/ui/dialog_background_hollow_1",
      "path": "textures/ui/dialog_background_hollow_1"
    },
    {
      "name": "mc/ui/dialog_background_hollow_2",
      "path": "textures/ui/dialog_background_hollow_2"
    },
    {
      "name": "mc/ui/dialog_background_hollow_3",
      "path": "textures/ui/dialog_background_hollow_3"
    },
    {
      "name": "mc/ui/dialog_background_hollow_4",
      "path": "textures/ui/dialog_background_hollow_4"
    },
    {
      "name": "mc/ui/dialog_background_hollow_4_thin",
      "path": "textures/ui/dialog_background_hollow_4_thin"
    },
    {
      "name": "mc/ui/dialog_background_hollow_5",
      "path": "textures/ui/dialog_background_hollow_5"
    },
    {
      "name": "mc/ui/dialog_background_hollow_6",
      "path": "textures/ui/dialog_background_hollow_6"
    },
    {
      "name": "mc/ui/dialog_background_hollow_7",
      "path": "textures/ui/dialog_background_hollow_7"
    },
    {
      "name": "mc/ui/dialog_background_hollow_8",
      "path": "textures/ui/dialog_background_hollow_8"
    },
    {
      "name": "mc/ui/dialog_background_opaque",
      "path": "textures/ui/dialog_background_opaque"
    },
    {
      "name": "mc/ui/dialog_background_opaque_overlap_bottom",
      "path": "textures/ui/dialog_background_opaque_overlap_bottom"
    },
    {
      "name": "mc/ui/dialog_bubble",
      "path": "textures/ui/dialog_bubble"
    },
    {
      "name": "mc/ui/dialog_bubble_point",
      "path": "textures/ui/dialog_bubble_point"
    },
    {
      "name": "mc/ui/dialog_divider",
      "path": "textures/ui/dialog_divider"
    },
    {
      "name": "mc/ui/disabledButton",
      "path": "textures/ui/disabledButton"
    },
    {
      "name": "mc/ui/disabledButtonNoBorder",
      "path": "textures/ui/disabledButtonNoBorder"
    },
    {
      "name": "mc/ui/dismount",
      "path": "textures/ui/dismount"
    },
    {
      "name": "mc/ui/dismount_pressed",
      "path": "textures/ui/dismount_pressed"
    },
    {
      "name": "mc/ui/divider",
      "path": "textures/ui/divider"
    },
    {
      "name": "mc/ui/divider2",
      "path": "textures/ui/divider2"
    },
    {
      "name": "mc/ui/divider3",
      "path": "textures/ui/divider3"
    },
    {
      "name": "mc/ui/download_backup",
      "path": "textures/ui/download_backup"
    },
    {
      "name": "mc/ui/down_arrow",
      "path": "textures/ui/down_arrow"
    },
    {
      "name": "mc/ui/down_tip_Chevron",
      "path": "textures/ui/down_tip_Chevron"
    },
    {
      "name": "mc/ui/dressing_room_animation",
      "path": "textures/ui/dressing_room_animation"
    },
    {
      "name": "mc/ui/dressing_room_banner",
      "path": "textures/ui/dressing_room_banner"
    },
    {
      "name": "mc/ui/dressing_room_capes",
      "path": "textures/ui/dressing_room_capes"
    },
    {
      "name": "mc/ui/dressing_room_customization",
      "path": "textures/ui/dressing_room_customization"
    },
    {
      "name": "mc/ui/dressing_room_skins",
      "path": "textures/ui/dressing_room_skins"
    },
    {
      "name": "mc/ui/dropDownHoverBG",
      "path": "textures/ui/dropDownHoverBG"
    },
    {
      "name": "mc/ui/dropDownSelectBG",
      "path": "textures/ui/dropDownSelectBG"
    },
    {
      "name": "mc/ui/dropdown_background",
      "path": "textures/ui/dropdown_background"
    },
    {
      "name": "mc/ui/dropdown_chevron",
      "path": "textures/ui/dropdown_chevron"
    },
    {
      "name": "mc/ui/dropdown_chevron_up",
      "path": "textures/ui/dropdown_chevron_up"
    },
    {
      "name": "mc/ui/dust_selectable_1",
      "path": "textures/ui/dust_selectable_1"
    },
    {
      "name": "mc/ui/dust_selectable_2",
      "path": "textures/ui/dust_selectable_2"
    },
    {
      "name": "mc/ui/dust_selectable_3",
      "path": "textures/ui/dust_selectable_3"
    },
    {
      "name": "mc/ui/dust_unselectable_1",
      "path": "textures/ui/dust_unselectable_1"
    },
    {
      "name": "mc/ui/dust_unselectable_2",
      "path": "textures/ui/dust_unselectable_2"
    },
    {
      "name": "mc/ui/dust_unselectable_3",
      "path": "textures/ui/dust_unselectable_3"
    },
    {
      "name": "mc/ui/easily_visible_creeper",
      "path": "textures/ui/easily_visible_creeper"
    },
    {
      "name": "mc/ui/editIcon",
      "path": "textures/ui/editIcon"
    },
    {
      "name": "mc/ui/edit_box_indent",
      "path": "textures/ui/edit_box_indent"
    },
    {
      "name": "mc/ui/edit_box_indent_hover",
      "path": "textures/ui/edit_box_indent_hover"
    },
    {
      "name": "mc/ui/effect_background",
      "path": "textures/ui/effect_background"
    },
    {
      "name": "mc/ui/elipses",
      "path": "textures/ui/elipses"
    },
    {
      "name": "mc/ui/emote_empty_0",
      "path": "textures/ui/emote_empty_0"
    },
    {
      "name": "mc/ui/emote_empty_1",
      "path": "textures/ui/emote_empty_1"
    },
    {
      "name": "mc/ui/emote_empty_2",
      "path": "textures/ui/emote_empty_2"
    },
    {
      "name": "mc/ui/emote_empty_3",
      "path": "textures/ui/emote_empty_3"
    },
    {
      "name": "mc/ui/emote_empty_4",
      "path": "textures/ui/emote_empty_4"
    },
    {
      "name": "mc/ui/emote_empty_5",
      "path": "textures/ui/emote_empty_5"
    },
    {
      "name": "mc/ui/emote_wheel_base",
      "path": "textures/ui/emote_wheel_base"
    },
    {
      "name": "mc/ui/emote_wheel_select_0",
      "path": "textures/ui/emote_wheel_select_0"
    },
    {
      "name": "mc/ui/emote_wheel_select_1",
      "path": "textures/ui/emote_wheel_select_1"
    },
    {
      "name": "mc/ui/emote_wheel_select_2",
      "path": "textures/ui/emote_wheel_select_2"
    },
    {
      "name": "mc/ui/emote_wheel_select_3",
      "path": "textures/ui/emote_wheel_select_3"
    },
    {
      "name": "mc/ui/emote_wheel_select_4",
      "path": "textures/ui/emote_wheel_select_4"
    },
    {
      "name": "mc/ui/emote_wheel_select_5",
      "path": "textures/ui/emote_wheel_select_5"
    },
    {
      "name": "mc/ui/emote_wheel_updated_base",
      "path": "textures/ui/emote_wheel_updated_base"
    },
    {
      "name": "mc/ui/emote_wheel_updated_select_0",
      "path": "textures/ui/emote_wheel_updated_select_0"
    },
    {
      "name": "mc/ui/emote_wheel_updated_select_1",
      "path": "textures/ui/emote_wheel_updated_select_1"
    },
    {
      "name": "mc/ui/emote_wheel_updated_select_2",
      "path": "textures/ui/emote_wheel_updated_select_2"
    },
    {
      "name": "mc/ui/emote_wheel_updated_select_3",
      "path": "textures/ui/emote_wheel_updated_select_3"
    },
    {
      "name": "mc/ui/emptyBar",
      "path": "textures/ui/emptyBar"
    },
    {
      "name": "mc/ui/emptyStar",
      "path": "textures/ui/emptyStar"
    },
    {
      "name": "mc/ui/emptyStarFocus",
      "path": "textures/ui/emptyStarFocus"
    },
    {
      "name": "mc/ui/empty_armor_slot_boots",
      "path": "textures/ui/empty_armor_slot_boots"
    },
    {
      "name": "mc/ui/empty_armor_slot_chestplate",
      "path": "textures/ui/empty_armor_slot_chestplate"
    },
    {
      "name": "mc/ui/empty_armor_slot_helmet",
      "path": "textures/ui/empty_armor_slot_helmet"
    },
    {
      "name": "mc/ui/empty_armor_slot_leggings",
      "path": "textures/ui/empty_armor_slot_leggings"
    },
    {
      "name": "mc/ui/empty_armor_slot_shield",
      "path": "textures/ui/empty_armor_slot_shield"
    },
    {
      "name": "mc/ui/empty_horse_slot_armor",
      "path": "textures/ui/empty_horse_slot_armor"
    },
    {
      "name": "mc/ui/empty_horse_slot_saddle",
      "path": "textures/ui/empty_horse_slot_saddle"
    },
    {
      "name": "mc/ui/empty_llama_slot_carpet",
      "path": "textures/ui/empty_llama_slot_carpet"
    },
    {
      "name": "mc/ui/empty_progress_bar",
      "path": "textures/ui/empty_progress_bar"
    },
    {
      "name": "mc/ui/empty_stack_progress_bar",
      "path": "textures/ui/empty_stack_progress_bar"
    },
    {
      "name": "mc/ui/enable_editor",
      "path": "textures/ui/enable_editor"
    },
    {
      "name": "mc/ui/enchanting_active_background",
      "path": "textures/ui/enchanting_active_background"
    },
    {
      "name": "mc/ui/enchanting_active_background_with_hover_text",
      "path": "textures/ui/enchanting_active_background_with_hover_text"
    },
    {
      "name": "mc/ui/enchanting_dark_background",
      "path": "textures/ui/enchanting_dark_background"
    },
    {
      "name": "mc/ui/equipped_item_border",
      "path": "textures/ui/equipped_item_border"
    },
    {
      "name": "mc/ui/ErrorGlyph",
      "path": "textures/ui/ErrorGlyph"
    },
    {
      "name": "mc/ui/ErrorGlyph_small",
      "path": "textures/ui/ErrorGlyph_small"
    },
    {
      "name": "mc/ui/ErrorGlyph_small_hover",
      "path": "textures/ui/ErrorGlyph_small_hover"
    },
    {
      "name": "mc/ui/experiencebarempty",
      "path": "textures/ui/experiencebarempty"
    },
    {
      "name": "mc/ui/experiencebarfull",
      "path": "textures/ui/experiencebarfull"
    },
    {
      "name": "mc/ui/experiencenub",
      "path": "textures/ui/experiencenub"
    },
    {
      "name": "mc/ui/experience_bar_empty_blue",
      "path": "textures/ui/experience_bar_empty_blue"
    },
    {
      "name": "mc/ui/experience_bar_full_blue",
      "path": "textures/ui/experience_bar_full_blue"
    },
    {
      "name": "mc/ui/experience_bar_full_white",
      "path": "textures/ui/experience_bar_full_white"
    },
    {
      "name": "mc/ui/experience_bar_nub_blue",
      "path": "textures/ui/experience_bar_nub_blue"
    },
    {
      "name": "mc/ui/Feedback",
      "path": "textures/ui/Feedback"
    },
    {
      "name": "mc/ui/feedIcon",
      "path": "textures/ui/feedIcon"
    },
    {
      "name": "mc/ui/feed_background",
      "path": "textures/ui/feed_background"
    },
    {
      "name": "mc/ui/filledBar",
      "path": "textures/ui/filledBar"
    },
    {
      "name": "mc/ui/filledStar",
      "path": "textures/ui/filledStar"
    },
    {
      "name": "mc/ui/filledStarFocus",
      "path": "textures/ui/filledStarFocus"
    },
    {
      "name": "mc/ui/filled_progress_bar",
      "path": "textures/ui/filled_progress_bar"
    },
    {
      "name": "mc/ui/fire_resistance_effect",
      "path": "textures/ui/fire_resistance_effect"
    },
    {
      "name": "mc/ui/first_of_three",
      "path": "textures/ui/first_of_three"
    },
    {
      "name": "mc/ui/first_of_two",
      "path": "textures/ui/first_of_two"
    },
    {
      "name": "mc/ui/flame_empty_image",
      "path": "textures/ui/flame_empty_image"
    },
    {
      "name": "mc/ui/flame_full_image",
      "path": "textures/ui/flame_full_image"
    },
    {
      "name": "mc/ui/flyingascend",
      "path": "textures/ui/flyingascend"
    },
    {
      "name": "mc/ui/flyingascend_pressed",
      "path": "textures/ui/flyingascend_pressed"
    },
    {
      "name": "mc/ui/flyingdescend",
      "path": "textures/ui/flyingdescend"
    },
    {
      "name": "mc/ui/flyingdescend_pressed",
      "path": "textures/ui/flyingdescend_pressed"
    },
    {
      "name": "mc/ui/flyout",
      "path": "textures/ui/flyout"
    },
    {
      "name": "mc/ui/focus_border_selected",
      "path": "textures/ui/focus_border_selected"
    },
    {
      "name": "mc/ui/focus_border_white",
      "path": "textures/ui/focus_border_white"
    },
    {
      "name": "mc/ui/freeze_heart",
      "path": "textures/ui/freeze_heart"
    },
    {
      "name": "mc/ui/freeze_heart_flash",
      "path": "textures/ui/freeze_heart_flash"
    },
    {
      "name": "mc/ui/freeze_heart_flash_half",
      "path": "textures/ui/freeze_heart_flash_half"
    },
    {
      "name": "mc/ui/freeze_heart_half",
      "path": "textures/ui/freeze_heart_half"
    },
    {
      "name": "mc/ui/free_download",
      "path": "textures/ui/free_download"
    },
    {
      "name": "mc/ui/free_download_symbol",
      "path": "textures/ui/free_download_symbol"
    },
    {
      "name": "mc/ui/Friend1",
      "path": "textures/ui/Friend1"
    },
    {
      "name": "mc/ui/friend1_black_outline",
      "path": "textures/ui/friend1_black_outline"
    },
    {
      "name": "mc/ui/friend1_black_outline_2x",
      "path": "textures/ui/friend1_black_outline_2x"
    },
    {
      "name": "mc/ui/Friend2",
      "path": "textures/ui/Friend2"
    },
    {
      "name": "mc/ui/FriendsDiversity",
      "path": "textures/ui/FriendsDiversity"
    },
    {
      "name": "mc/ui/FriendsIcon",
      "path": "textures/ui/FriendsIcon"
    },
    {
      "name": "mc/ui/friend_glyph",
      "path": "textures/ui/friend_glyph"
    },
    {
      "name": "mc/ui/friend_glyph_desaturated",
      "path": "textures/ui/friend_glyph_desaturated"
    },
    {
      "name": "mc/ui/frozen_effect",
      "path": "textures/ui/frozen_effect"
    },
    {
      "name": "mc/ui/gamepad_icon_button",
      "path": "textures/ui/gamepad_icon_button"
    },
    {
      "name": "mc/ui/gamepad_icon_dpad",
      "path": "textures/ui/gamepad_icon_dpad"
    },
    {
      "name": "mc/ui/gamepad_icon_left_bumper",
      "path": "textures/ui/gamepad_icon_left_bumper"
    },
    {
      "name": "mc/ui/gamepad_icon_left_trigger",
      "path": "textures/ui/gamepad_icon_left_trigger"
    },
    {
      "name": "mc/ui/gamepad_icon_right_bumper",
      "path": "textures/ui/gamepad_icon_right_bumper"
    },
    {
      "name": "mc/ui/gamepad_icon_right_trigger",
      "path": "textures/ui/gamepad_icon_right_trigger"
    },
    {
      "name": "mc/ui/gamepad_icon_thumbstick",
      "path": "textures/ui/gamepad_icon_thumbstick"
    },
    {
      "name": "mc/ui/gamerpic",
      "path": "textures/ui/gamerpic"
    },
    {
      "name": "mc/ui/gamerpic_bevel",
      "path": "textures/ui/gamerpic_bevel"
    },
    {
      "name": "mc/ui/gamerpic_bevel_hover",
      "path": "textures/ui/gamerpic_bevel_hover"
    },
    {
      "name": "mc/ui/gamerscore",
      "path": "textures/ui/gamerscore"
    },
    {
      "name": "mc/ui/gear",
      "path": "textures/ui/gear"
    },
    {
      "name": "mc/ui/generic_14x14_face_button_down",
      "path": "textures/ui/generic_14x14_face_button_down"
    },
    {
      "name": "mc/ui/generic_14x14_face_button_left",
      "path": "textures/ui/generic_14x14_face_button_left"
    },
    {
      "name": "mc/ui/generic_14x14_face_button_right",
      "path": "textures/ui/generic_14x14_face_button_right"
    },
    {
      "name": "mc/ui/generic_14x14_face_button_up",
      "path": "textures/ui/generic_14x14_face_button_up"
    },
    {
      "name": "mc/ui/generic_bumper_left",
      "path": "textures/ui/generic_bumper_left"
    },
    {
      "name": "mc/ui/generic_bumper_right",
      "path": "textures/ui/generic_bumper_right"
    },
    {
      "name": "mc/ui/generic_dpad",
      "path": "textures/ui/generic_dpad"
    },
    {
      "name": "mc/ui/generic_dpad_down",
      "path": "textures/ui/generic_dpad_down"
    },
    {
      "name": "mc/ui/generic_dpad_left",
      "path": "textures/ui/generic_dpad_left"
    },
    {
      "name": "mc/ui/generic_dpad_right",
      "path": "textures/ui/generic_dpad_right"
    },
    {
      "name": "mc/ui/generic_dpad_up",
      "path": "textures/ui/generic_dpad_up"
    },
    {
      "name": "mc/ui/generic_face_button_down",
      "path": "textures/ui/generic_face_button_down"
    },
    {
      "name": "mc/ui/generic_face_button_left",
      "path": "textures/ui/generic_face_button_left"
    },
    {
      "name": "mc/ui/generic_face_button_right",
      "path": "textures/ui/generic_face_button_right"
    },
    {
      "name": "mc/ui/generic_face_button_up",
      "path": "textures/ui/generic_face_button_up"
    },
    {
      "name": "mc/ui/generic_left_trigger",
      "path": "textures/ui/generic_left_trigger"
    },
    {
      "name": "mc/ui/generic_right_trigger",
      "path": "textures/ui/generic_right_trigger"
    },
    {
      "name": "mc/ui/generic_select_button",
      "path": "textures/ui/generic_select_button"
    },
    {
      "name": "mc/ui/generic_start_button",
      "path": "textures/ui/generic_start_button"
    },
    {
      "name": "mc/ui/generic_stick_left",
      "path": "textures/ui/generic_stick_left"
    },
    {
      "name": "mc/ui/generic_stick_right",
      "path": "textures/ui/generic_stick_right"
    },
    {
      "name": "mc/ui/generic_touchpad",
      "path": "textures/ui/generic_touchpad"
    },
    {
      "name": "mc/ui/gift_featured",
      "path": "textures/ui/gift_featured"
    },
    {
      "name": "mc/ui/gift_square",
      "path": "textures/ui/gift_square"
    },
    {
      "name": "mc/ui/glyph_inventory",
      "path": "textures/ui/glyph_inventory"
    },
    {
      "name": "mc/ui/glyph_mashup_pack",
      "path": "textures/ui/glyph_mashup_pack"
    },
    {
      "name": "mc/ui/glyph_persona",
      "path": "textures/ui/glyph_persona"
    },
    {
      "name": "mc/ui/glyph_realms",
      "path": "textures/ui/glyph_realms"
    },
    {
      "name": "mc/ui/glyph_resource_pack",
      "path": "textures/ui/glyph_resource_pack"
    },
    {
      "name": "mc/ui/glyph_resource_pack_small",
      "path": "textures/ui/glyph_resource_pack_small"
    },
    {
      "name": "mc/ui/glyph_skin_pack",
      "path": "textures/ui/glyph_skin_pack"
    },
    {
      "name": "mc/ui/glyph_skin_pack_small",
      "path": "textures/ui/glyph_skin_pack_small"
    },
    {
      "name": "mc/ui/glyph_skin_world_small",
      "path": "textures/ui/glyph_skin_world_small"
    },
    {
      "name": "mc/ui/glyph_world_template",
      "path": "textures/ui/glyph_world_template"
    },
    {
      "name": "mc/ui/Gray",
      "path": "textures/ui/Gray"
    },
    {
      "name": "mc/ui/green",
      "path": "textures/ui/green"
    },
    {
      "name": "mc/ui/greenCorner",
      "path": "textures/ui/greenCorner"
    },
    {
      "name": "mc/ui/Grey",
      "path": "textures/ui/Grey"
    },
    {
      "name": "mc/ui/greyBorder",
      "path": "textures/ui/greyBorder"
    },
    {
      "name": "mc/ui/grey_gamepad_icon_button",
      "path": "textures/ui/grey_gamepad_icon_button"
    },
    {
      "name": "mc/ui/hammersmashedits",
      "path": "textures/ui/hammersmashedits"
    },
    {
      "name": "mc/ui/hammer_l",
      "path": "textures/ui/hammer_l"
    },
    {
      "name": "mc/ui/hammer_l_disabled",
      "path": "textures/ui/hammer_l_disabled"
    },
    {
      "name": "mc/ui/hammer_r",
      "path": "textures/ui/hammer_r"
    },
    {
      "name": "mc/ui/hammer_r_disabled",
      "path": "textures/ui/hammer_r_disabled"
    },
    {
      "name": "mc/ui/hangar",
      "path": "textures/ui/hangar"
    },
    {
      "name": "mc/ui/hanging_sign",
      "path": "textures/ui/hanging_sign"
    },
    {
      "name": "mc/ui/hanging_sign_acacia",
      "path": "textures/ui/hanging_sign_acacia"
    },
    {
      "name": "mc/ui/hanging_sign_bamboo",
      "path": "textures/ui/hanging_sign_bamboo"
    },
    {
      "name": "mc/ui/hanging_sign_birch",
      "path": "textures/ui/hanging_sign_birch"
    },
    {
      "name": "mc/ui/hanging_sign_cherry",
      "path": "textures/ui/hanging_sign_cherry"
    },
    {
      "name": "mc/ui/hanging_sign_crimson",
      "path": "textures/ui/hanging_sign_crimson"
    },
    {
      "name": "mc/ui/hanging_sign_darkoak",
      "path": "textures/ui/hanging_sign_darkoak"
    },
    {
      "name": "mc/ui/hanging_sign_jungle",
      "path": "textures/ui/hanging_sign_jungle"
    },
    {
      "name": "mc/ui/hanging_sign_mangrove",
      "path": "textures/ui/hanging_sign_mangrove"
    },
    {
      "name": "mc/ui/hanging_sign_spruce",
      "path": "textures/ui/hanging_sign_spruce"
    },
    {
      "name": "mc/ui/hanging_sign_warped",
      "path": "textures/ui/hanging_sign_warped"
    },
    {
      "name": "mc/ui/haste_effect",
      "path": "textures/ui/haste_effect"
    },
    {
      "name": "mc/ui/header_bar",
      "path": "textures/ui/header_bar"
    },
    {
      "name": "mc/ui/header_bar_2",
      "path": "textures/ui/header_bar_2"
    },
    {
      "name": "mc/ui/health_boost_effect",
      "path": "textures/ui/health_boost_effect"
    },
    {
      "name": "mc/ui/heart",
      "path": "textures/ui/heart"
    },
    {
      "name": "mc/ui/heart_background",
      "path": "textures/ui/heart_background"
    },
    {
      "name": "mc/ui/heart_blink",
      "path": "textures/ui/heart_blink"
    },
    {
      "name": "mc/ui/heart_flash",
      "path": "textures/ui/heart_flash"
    },
    {
      "name": "mc/ui/heart_flash_half",
      "path": "textures/ui/heart_flash_half"
    },
    {
      "name": "mc/ui/heart_half",
      "path": "textures/ui/heart_half"
    },
    {
      "name": "mc/ui/heart_new",
      "path": "textures/ui/heart_new"
    },
    {
      "name": "mc/ui/highlight_slot",
      "path": "textures/ui/highlight_slot"
    },
    {
      "name": "mc/ui/hint_burst",
      "path": "textures/ui/hint_burst"
    },
    {
      "name": "mc/ui/hint_burst_small",
      "path": "textures/ui/hint_burst_small"
    },
    {
      "name": "mc/ui/hollowbanner",
      "path": "textures/ui/hollowbanner"
    },
    {
      "name": "mc/ui/horizontalbreak",
      "path": "textures/ui/horizontalbreak"
    },
    {
      "name": "mc/ui/horizontal_divider",
      "path": "textures/ui/horizontal_divider"
    },
    {
      "name": "mc/ui/horse_heart",
      "path": "textures/ui/horse_heart"
    },
    {
      "name": "mc/ui/horse_heart_flash",
      "path": "textures/ui/horse_heart_flash"
    },
    {
      "name": "mc/ui/horse_heart_flash_half",
      "path": "textures/ui/horse_heart_flash_half"
    },
    {
      "name": "mc/ui/horse_heart_half",
      "path": "textures/ui/horse_heart_half"
    },
    {
      "name": "mc/ui/horse_jump_empty",
      "path": "textures/ui/horse_jump_empty"
    },
    {
      "name": "mc/ui/horse_jump_full",
      "path": "textures/ui/horse_jump_full"
    },
    {
      "name": "mc/ui/hotbar_0",
      "path": "textures/ui/hotbar_0"
    },
    {
      "name": "mc/ui/hotbar_1",
      "path": "textures/ui/hotbar_1"
    },
    {
      "name": "mc/ui/hotbar_2",
      "path": "textures/ui/hotbar_2"
    },
    {
      "name": "mc/ui/hotbar_3",
      "path": "textures/ui/hotbar_3"
    },
    {
      "name": "mc/ui/hotbar_4",
      "path": "textures/ui/hotbar_4"
    },
    {
      "name": "mc/ui/hotbar_5",
      "path": "textures/ui/hotbar_5"
    },
    {
      "name": "mc/ui/hotbar_6",
      "path": "textures/ui/hotbar_6"
    },
    {
      "name": "mc/ui/hotbar_7",
      "path": "textures/ui/hotbar_7"
    },
    {
      "name": "mc/ui/hotbar_8",
      "path": "textures/ui/hotbar_8"
    },
    {
      "name": "mc/ui/hotbar_end_cap",
      "path": "textures/ui/hotbar_end_cap"
    },
    {
      "name": "mc/ui/hotbar_start_cap",
      "path": "textures/ui/hotbar_start_cap"
    },
    {
      "name": "mc/ui/HowToPlayDivider",
      "path": "textures/ui/HowToPlayDivider"
    },
    {
      "name": "mc/ui/how_to_play_button_default",
      "path": "textures/ui/how_to_play_button_default"
    },
    {
      "name": "mc/ui/how_to_play_button_default_light",
      "path": "textures/ui/how_to_play_button_default_light"
    },
    {
      "name": "mc/ui/how_to_play_button_hover",
      "path": "textures/ui/how_to_play_button_hover"
    },
    {
      "name": "mc/ui/how_to_play_button_hover_light",
      "path": "textures/ui/how_to_play_button_hover_light"
    },
    {
      "name": "mc/ui/how_to_play_button_pressed",
      "path": "textures/ui/how_to_play_button_pressed"
    },
    {
      "name": "mc/ui/how_to_play_button_pressed_light",
      "path": "textures/ui/how_to_play_button_pressed_light"
    },
    {
      "name": "mc/ui/hud_mob_effect_background",
      "path": "textures/ui/hud_mob_effect_background"
    },
    {
      "name": "mc/ui/hud_tip_text_background",
      "path": "textures/ui/hud_tip_text_background"
    },
    {
      "name": "mc/ui/hunger_background",
      "path": "textures/ui/hunger_background"
    },
    {
      "name": "mc/ui/hunger_blink",
      "path": "textures/ui/hunger_blink"
    },
    {
      "name": "mc/ui/hunger_effect",
      "path": "textures/ui/hunger_effect"
    },
    {
      "name": "mc/ui/hunger_effect_background",
      "path": "textures/ui/hunger_effect_background"
    },
    {
      "name": "mc/ui/hunger_effect_flash_full",
      "path": "textures/ui/hunger_effect_flash_full"
    },
    {
      "name": "mc/ui/hunger_effect_flash_half",
      "path": "textures/ui/hunger_effect_flash_half"
    },
    {
      "name": "mc/ui/hunger_effect_full",
      "path": "textures/ui/hunger_effect_full"
    },
    {
      "name": "mc/ui/hunger_effect_half",
      "path": "textures/ui/hunger_effect_half"
    },
    {
      "name": "mc/ui/hunger_flash_full",
      "path": "textures/ui/hunger_flash_full"
    },
    {
      "name": "mc/ui/hunger_flash_half",
      "path": "textures/ui/hunger_flash_half"
    },
    {
      "name": "mc/ui/hunger_full",
      "path": "textures/ui/hunger_full"
    },
    {
      "name": "mc/ui/hunger_half",
      "path": "textures/ui/hunger_half"
    },
    {
      "name": "mc/ui/icon_agent",
      "path": "textures/ui/icon_agent"
    },
    {
      "name": "mc/ui/icon_alex",
      "path": "textures/ui/icon_alex"
    },
    {
      "name": "mc/ui/icon_apple",
      "path": "textures/ui/icon_apple"
    },
    {
      "name": "mc/ui/icon_armor",
      "path": "textures/ui/icon_armor"
    },
    {
      "name": "mc/ui/icon_balloon",
      "path": "textures/ui/icon_balloon"
    },
    {
      "name": "mc/ui/icon_bell",
      "path": "textures/ui/icon_bell"
    },
    {
      "name": "mc/ui/icon_best3",
      "path": "textures/ui/icon_best3"
    },
    {
      "name": "mc/ui/icon_blackfriday",
      "path": "textures/ui/icon_blackfriday"
    },
    {
      "name": "mc/ui/icon_bookshelf",
      "path": "textures/ui/icon_bookshelf"
    },
    {
      "name": "mc/ui/icon_book_writable",
      "path": "textures/ui/icon_book_writable"
    },
    {
      "name": "mc/ui/icon_cake",
      "path": "textures/ui/icon_cake"
    },
    {
      "name": "mc/ui/icon_carrot",
      "path": "textures/ui/icon_carrot"
    },
    {
      "name": "mc/ui/icon_cookie",
      "path": "textures/ui/icon_cookie"
    },
    {
      "name": "mc/ui/icon_crafting",
      "path": "textures/ui/icon_crafting"
    },
    {
      "name": "mc/ui/icon_deals",
      "path": "textures/ui/icon_deals"
    },
    {
      "name": "mc/ui/icon_expand",
      "path": "textures/ui/icon_expand"
    },
    {
      "name": "mc/ui/icon_fall",
      "path": "textures/ui/icon_fall"
    },
    {
      "name": "mc/ui/icon_fish_clownfish_raw",
      "path": "textures/ui/icon_fish_clownfish_raw"
    },
    {
      "name": "mc/ui/icon_hangar",
      "path": "textures/ui/icon_hangar"
    },
    {
      "name": "mc/ui/icon_import",
      "path": "textures/ui/icon_import"
    },
    {
      "name": "mc/ui/icon_iron_pickaxe",
      "path": "textures/ui/icon_iron_pickaxe"
    },
    {
      "name": "mc/ui/icon_llama",
      "path": "textures/ui/icon_llama"
    },
    {
      "name": "mc/ui/icon_lock",
      "path": "textures/ui/icon_lock"
    },
    {
      "name": "mc/ui/icon_map",
      "path": "textures/ui/icon_map"
    },
    {
      "name": "mc/ui/icon_minecoin_9x9",
      "path": "textures/ui/icon_minecoin_9x9"
    },
    {
      "name": "mc/ui/icon_multiplayer",
      "path": "textures/ui/icon_multiplayer"
    },
    {
      "name": "mc/ui/icon_new",
      "path": "textures/ui/icon_new"
    },
    {
      "name": "mc/ui/icon_new_item",
      "path": "textures/ui/icon_new_item"
    },
    {
      "name": "mc/ui/icon_none",
      "path": "textures/ui/icon_none"
    },
    {
      "name": "mc/ui/icon_overlay_bg",
      "path": "textures/ui/icon_overlay_bg"
    },
    {
      "name": "mc/ui/icon_panda",
      "path": "textures/ui/icon_panda"
    },
    {
      "name": "mc/ui/icon_potion",
      "path": "textures/ui/icon_potion"
    },
    {
      "name": "mc/ui/icon_preview",
      "path": "textures/ui/icon_preview"
    },
    {
      "name": "mc/ui/icon_rail_normal",
      "path": "textures/ui/icon_rail_normal"
    },
    {
      "name": "mc/ui/icon_random",
      "path": "textures/ui/icon_random"
    },
    {
      "name": "mc/ui/icon_recipe_construction",
      "path": "textures/ui/icon_recipe_construction"
    },
    {
      "name": "mc/ui/icon_recipe_equipment",
      "path": "textures/ui/icon_recipe_equipment"
    },
    {
      "name": "mc/ui/icon_recipe_item",
      "path": "textures/ui/icon_recipe_item"
    },
    {
      "name": "mc/ui/icon_recipe_nature",
      "path": "textures/ui/icon_recipe_nature"
    },
    {
      "name": "mc/ui/icon_saleribbon",
      "path": "textures/ui/icon_saleribbon"
    },
    {
      "name": "mc/ui/icon_setting",
      "path": "textures/ui/icon_setting"
    },
    {
      "name": "mc/ui/icon_sign",
      "path": "textures/ui/icon_sign"
    },
    {
      "name": "mc/ui/icon_spring",
      "path": "textures/ui/icon_spring"
    },
    {
      "name": "mc/ui/icon_staffpicks",
      "path": "textures/ui/icon_staffpicks"
    },
    {
      "name": "mc/ui/icon_steve",
      "path": "textures/ui/icon_steve"
    },
    {
      "name": "mc/ui/icon_summer",
      "path": "textures/ui/icon_summer"
    },
    {
      "name": "mc/ui/icon_timer",
      "path": "textures/ui/icon_timer"
    },
    {
      "name": "mc/ui/icon_trailer",
      "path": "textures/ui/icon_trailer"
    },
    {
      "name": "mc/ui/icon_trash",
      "path": "textures/ui/icon_trash"
    },
    {
      "name": "mc/ui/icon_trending",
      "path": "textures/ui/icon_trending"
    },
    {
      "name": "mc/ui/icon_unlocked",
      "path": "textures/ui/icon_unlocked"
    },
    {
      "name": "mc/ui/icon_water_bucket",
      "path": "textures/ui/icon_water_bucket"
    },
    {
      "name": "mc/ui/icon_winter",
      "path": "textures/ui/icon_winter"
    },
    {
      "name": "mc/ui/ic_send_white_48dp",
      "path": "textures/ui/ic_send_white_48dp"
    },
    {
      "name": "mc/ui/imagetaggedcorner",
      "path": "textures/ui/imagetaggedcorner"
    },
    {
      "name": "mc/ui/imagetaggedcornergreen",
      "path": "textures/ui/imagetaggedcornergreen"
    },
    {
      "name": "mc/ui/imagetaggedcornergreenhover",
      "path": "textures/ui/imagetaggedcornergreenhover"
    },
    {
      "name": "mc/ui/imagetaggedcornergreenpressed",
      "path": "textures/ui/imagetaggedcornergreenpressed"
    },
    {
      "name": "mc/ui/immersive_reader",
      "path": "textures/ui/immersive_reader"
    },
    {
      "name": "mc/ui/import",
      "path": "textures/ui/import"
    },
    {
      "name": "mc/ui/ImpulseSquare",
      "path": "textures/ui/ImpulseSquare"
    },
    {
      "name": "mc/ui/infobulb",
      "path": "textures/ui/infobulb"
    },
    {
      "name": "mc/ui/infoBulb_Darkborder_small",
      "path": "textures/ui/infoBulb_Darkborder_small"
    },
    {
      "name": "mc/ui/ingot_image",
      "path": "textures/ui/ingot_image"
    },
    {
      "name": "mc/ui/interact",
      "path": "textures/ui/interact"
    },
    {
      "name": "mc/ui/interact_pressed",
      "path": "textures/ui/interact_pressed"
    },
    {
      "name": "mc/ui/InvalidWorldDemoScreen",
      "path": "textures/ui/InvalidWorldDemoScreen"
    },
    {
      "name": "mc/ui/inventory_icon",
      "path": "textures/ui/inventory_icon"
    },
    {
      "name": "mc/ui/inventory_warning_xbox",
      "path": "textures/ui/inventory_warning_xbox"
    },
    {
      "name": "mc/ui/invertedmultiselecticon",
      "path": "textures/ui/invertedmultiselecticon"
    },
    {
      "name": "mc/ui/invisibility_effect",
      "path": "textures/ui/invisibility_effect"
    },
    {
      "name": "mc/ui/invite_base",
      "path": "textures/ui/invite_base"
    },
    {
      "name": "mc/ui/invite_number_background",
      "path": "textures/ui/invite_number_background"
    },
    {
      "name": "mc/ui/item_cell",
      "path": "textures/ui/item_cell"
    },
    {
      "name": "mc/ui/item_lock_red",
      "path": "textures/ui/item_lock_red"
    },
    {
      "name": "mc/ui/item_lock_yellow",
      "path": "textures/ui/item_lock_yellow"
    },
    {
      "name": "mc/ui/item_seperator",
      "path": "textures/ui/item_seperator"
    },
    {
      "name": "mc/ui/jens_shocked",
      "path": "textures/ui/jens_shocked"
    },
    {
      "name": "mc/ui/joystick_frame",
      "path": "textures/ui/joystick_frame"
    },
    {
      "name": "mc/ui/joystick_knob",
      "path": "textures/ui/joystick_knob"
    },
    {
      "name": "mc/ui/jump",
      "path": "textures/ui/jump"
    },
    {
      "name": "mc/ui/jump_boost_effect",
      "path": "textures/ui/jump_boost_effect"
    },
    {
      "name": "mc/ui/jump_pressed",
      "path": "textures/ui/jump_pressed"
    },
    {
      "name": "mc/ui/keyboard_and_mouse_glyph",
      "path": "textures/ui/keyboard_and_mouse_glyph"
    },
    {
      "name": "mc/ui/keyboard_and_mouse_glyph_color",
      "path": "textures/ui/keyboard_and_mouse_glyph_color"
    },
    {
      "name": "mc/ui/keyboard_tooltip_background",
      "path": "textures/ui/keyboard_tooltip_background"
    },
    {
      "name": "mc/ui/keyboard_tooltip_icon",
      "path": "textures/ui/keyboard_tooltip_icon"
    },
    {
      "name": "mc/ui/language_glyph",
      "path": "textures/ui/language_glyph"
    },
    {
      "name": "mc/ui/language_glyph_color",
      "path": "textures/ui/language_glyph_color"
    },
    {
      "name": "mc/ui/lan_icon",
      "path": "textures/ui/lan_icon"
    },
    {
      "name": "mc/ui/lapis",
      "path": "textures/ui/lapis"
    },
    {
      "name": "mc/ui/lapis_image",
      "path": "textures/ui/lapis_image"
    },
    {
      "name": "mc/ui/large_fish_bevel",
      "path": "textures/ui/large_fish_bevel"
    },
    {
      "name": "mc/ui/legacybanner",
      "path": "textures/ui/legacybanner"
    },
    {
      "name": "mc/ui/legacy_pocket_close_button_default",
      "path": "textures/ui/legacy_pocket_close_button_default"
    },
    {
      "name": "mc/ui/legacy_pocket_close_button_pressed",
      "path": "textures/ui/legacy_pocket_close_button_pressed"
    },
    {
      "name": "mc/ui/levitation_effect",
      "path": "textures/ui/levitation_effect"
    },
    {
      "name": "mc/ui/light",
      "path": "textures/ui/light"
    },
    {
      "name": "mc/ui/lightgreybars",
      "path": "textures/ui/lightgreybars"
    },
    {
      "name": "mc/ui/like_default",
      "path": "textures/ui/like_default"
    },
    {
      "name": "mc/ui/listcheck",
      "path": "textures/ui/listcheck"
    },
    {
      "name": "mc/ui/listcheck_smaller",
      "path": "textures/ui/listcheck_smaller"
    },
    {
      "name": "mc/ui/listx",
      "path": "textures/ui/listx"
    },
    {
      "name": "mc/ui/list_item_divider_line_light",
      "path": "textures/ui/list_item_divider_line_light"
    },
    {
      "name": "mc/ui/LoadingWorldDemoScreen",
      "path": "textures/ui/LoadingWorldDemoScreen"
    },
    {
      "name": "mc/ui/loading_bar",
      "path": "textures/ui/loading_bar"
    },
    {
      "name": "mc/ui/loading_spin",
      "path": "textures/ui/loading_spin"
    },
    {
      "name": "mc/ui/Local",
      "path": "textures/ui/Local"
    },
    {
      "name": "mc/ui/local_and_cloud_storage",
      "path": "textures/ui/local_and_cloud_storage"
    },
    {
      "name": "mc/ui/local_only_storage",
      "path": "textures/ui/local_only_storage"
    },
    {
      "name": "mc/ui/lock",
      "path": "textures/ui/lock"
    },
    {
      "name": "mc/ui/lock_color",
      "path": "textures/ui/lock_color"
    },
    {
      "name": "mc/ui/loom_banner_empty",
      "path": "textures/ui/loom_banner_empty"
    },
    {
      "name": "mc/ui/loom_dye_empty",
      "path": "textures/ui/loom_dye_empty"
    },
    {
      "name": "mc/ui/loom_pattern_item_empty",
      "path": "textures/ui/loom_pattern_item_empty"
    },
    {
      "name": "mc/ui/magnifyingGlass",
      "path": "textures/ui/magnifyingGlass"
    },
    {
      "name": "mc/ui/magnifying_glass",
      "path": "textures/ui/magnifying_glass"
    },
    {
      "name": "mc/ui/mail_icon",
      "path": "textures/ui/mail_icon"
    },
    {
      "name": "mc/ui/mainbanners",
      "path": "textures/ui/mainbanners"
    },
    {
      "name": "mc/ui/MainBannersHover",
      "path": "textures/ui/MainBannersHover"
    },
    {
      "name": "mc/ui/mainbanners_transparency",
      "path": "textures/ui/mainbanners_transparency"
    },
    {
      "name": "mc/ui/mangrove_sign",
      "path": "textures/ui/mangrove_sign"
    },
    {
      "name": "mc/ui/marketplace_error_graphic_anim_tree",
      "path": "textures/ui/marketplace_error_graphic_anim_tree"
    },
    {
      "name": "mc/ui/marketplace_error_graphic_anim_water",
      "path": "textures/ui/marketplace_error_graphic_anim_water"
    },
    {
      "name": "mc/ui/MashupIcon",
      "path": "textures/ui/MashupIcon"
    },
    {
      "name": "mc/ui/mashup_hangar",
      "path": "textures/ui/mashup_hangar"
    },
    {
      "name": "mc/ui/mashup_PaintBrush",
      "path": "textures/ui/mashup_PaintBrush"
    },
    {
      "name": "mc/ui/mashup_world",
      "path": "textures/ui/mashup_world"
    },
    {
      "name": "mc/ui/massive_servers",
      "path": "textures/ui/massive_servers"
    },
    {
      "name": "mc/ui/MCoin",
      "path": "textures/ui/MCoin"
    },
    {
      "name": "mc/ui/menubackground",
      "path": "textures/ui/menubackground"
    },
    {
      "name": "mc/ui/message",
      "path": "textures/ui/message"
    },
    {
      "name": "mc/ui/middle_strip",
      "path": "textures/ui/middle_strip"
    },
    {
      "name": "mc/ui/mine_chop_dig_animation",
      "path": "textures/ui/mine_chop_dig_animation"
    },
    {
      "name": "mc/ui/minimize",
      "path": "textures/ui/minimize"
    },
    {
      "name": "mc/ui/minimizeHover",
      "path": "textures/ui/minimizeHover"
    },
    {
      "name": "mc/ui/minimizePress",
      "path": "textures/ui/minimizePress"
    },
    {
      "name": "mc/ui/mining_fatigue_effect",
      "path": "textures/ui/mining_fatigue_effect"
    },
    {
      "name": "mc/ui/minus",
      "path": "textures/ui/minus"
    },
    {
      "name": "mc/ui/missing_item",
      "path": "textures/ui/missing_item"
    },
    {
      "name": "mc/ui/missing_pack_icon",
      "path": "textures/ui/missing_pack_icon"
    },
    {
      "name": "mc/ui/mobile_data_icon_android",
      "path": "textures/ui/mobile_data_icon_android"
    },
    {
      "name": "mc/ui/mobile_data_icon_ios",
      "path": "textures/ui/mobile_data_icon_ios"
    },
    {
      "name": "mc/ui/mob_effect_background",
      "path": "textures/ui/mob_effect_background"
    },
    {
      "name": "mc/ui/more-dots",
      "path": "textures/ui/more-dots"
    },
    {
      "name": "mc/ui/more_dots",
      "path": "textures/ui/more_dots"
    },
    {
      "name": "mc/ui/mount",
      "path": "textures/ui/mount"
    },
    {
      "name": "mc/ui/mount_pressed",
      "path": "textures/ui/mount_pressed"
    },
    {
      "name": "mc/ui/move",
      "path": "textures/ui/move"
    },
    {
      "name": "mc/ui/multiplayer_glyph",
      "path": "textures/ui/multiplayer_glyph"
    },
    {
      "name": "mc/ui/multiplayer_glyph_color",
      "path": "textures/ui/multiplayer_glyph_color"
    },
    {
      "name": "mc/ui/multiselection",
      "path": "textures/ui/multiselection"
    },
    {
      "name": "mc/ui/mute_off",
      "path": "textures/ui/mute_off"
    },
    {
      "name": "mc/ui/mute_on",
      "path": "textures/ui/mute_on"
    },
    {
      "name": "mc/ui/nausea_effect",
      "path": "textures/ui/nausea_effect"
    },
    {
      "name": "mc/ui/navy_blue",
      "path": "textures/ui/navy_blue"
    },
    {
      "name": "mc/ui/NetherPortal",
      "path": "textures/ui/NetherPortal"
    },
    {
      "name": "mc/ui/NetherPortalMirror",
      "path": "textures/ui/NetherPortalMirror"
    },
    {
      "name": "mc/ui/newOffersIcon",
      "path": "textures/ui/newOffersIcon"
    },
    {
      "name": "mc/ui/newTouchScrollBox",
      "path": "textures/ui/newTouchScrollBox"
    },
    {
      "name": "mc/ui/New_confirm_Hover",
      "path": "textures/ui/New_confirm_Hover"
    },
    {
      "name": "mc/ui/new_offer_symbol",
      "path": "textures/ui/new_offer_symbol"
    },
    {
      "name": "mc/ui/night_vision_effect",
      "path": "textures/ui/night_vision_effect"
    },
    {
      "name": "mc/ui/normalArm",
      "path": "textures/ui/normalArm"
    },
    {
      "name": "mc/ui/NormalButtonNoStroke",
      "path": "textures/ui/NormalButtonNoStroke"
    },
    {
      "name": "mc/ui/NormalButtonStroke",
      "path": "textures/ui/NormalButtonStroke"
    },
    {
      "name": "mc/ui/NormalButtonThin",
      "path": "textures/ui/NormalButtonThin"
    },
    {
      "name": "mc/ui/NormalButtonThinStroke",
      "path": "textures/ui/NormalButtonThinStroke"
    },
    {
      "name": "mc/ui/normalHeight",
      "path": "textures/ui/normalHeight"
    },
    {
      "name": "mc/ui/normal_hover",
      "path": "textures/ui/normal_hover"
    },
    {
      "name": "mc/ui/normal_normal",
      "path": "textures/ui/normal_normal"
    },
    {
      "name": "mc/ui/normal_pressed",
      "path": "textures/ui/normal_pressed"
    },
    {
      "name": "mc/ui/normal_stroke_button",
      "path": "textures/ui/normal_stroke_button"
    },
    {
      "name": "mc/ui/not_visible_creeper",
      "path": "textures/ui/not_visible_creeper"
    },
    {
      "name": "mc/ui/numberBGBack",
      "path": "textures/ui/numberBGBack"
    },
    {
      "name": "mc/ui/numberBGFront",
      "path": "textures/ui/numberBGFront"
    },
    {
      "name": "mc/ui/offline",
      "path": "textures/ui/offline"
    },
    {
      "name": "mc/ui/online",
      "path": "textures/ui/online"
    },
    {
      "name": "mc/ui/onlineLight",
      "path": "textures/ui/onlineLight"
    },
    {
      "name": "mc/ui/op",
      "path": "textures/ui/op"
    },
    {
      "name": "mc/ui/packs_border",
      "path": "textures/ui/packs_border"
    },
    {
      "name": "mc/ui/packs_middle",
      "path": "textures/ui/packs_middle"
    },
    {
      "name": "mc/ui/panel_outline",
      "path": "textures/ui/panel_outline"
    },
    {
      "name": "mc/ui/panorama_0",
      "path": "textures/ui/panorama_0"
    },
    {
      "name": "mc/ui/panorama_1",
      "path": "textures/ui/panorama_1"
    },
    {
      "name": "mc/ui/panorama_2",
      "path": "textures/ui/panorama_2"
    },
    {
      "name": "mc/ui/panorama_3",
      "path": "textures/ui/panorama_3"
    },
    {
      "name": "mc/ui/panorama_4",
      "path": "textures/ui/panorama_4"
    },
    {
      "name": "mc/ui/panorama_5",
      "path": "textures/ui/panorama_5"
    },
    {
      "name": "mc/ui/panorama_overlay",
      "path": "textures/ui/panorama_overlay"
    },
    {
      "name": "mc/ui/particles",
      "path": "textures/ui/particles"
    },
    {
      "name": "mc/ui/particles2",
      "path": "textures/ui/particles2"
    },
    {
      "name": "mc/ui/particles3",
      "path": "textures/ui/particles3"
    },
    {
      "name": "mc/ui/paste",
      "path": "textures/ui/paste"
    },
    {
      "name": "mc/ui/pause_screen_border",
      "path": "textures/ui/pause_screen_border"
    },
    {
      "name": "mc/ui/pencil_edit_icon",
      "path": "textures/ui/pencil_edit_icon"
    },
    {
      "name": "mc/ui/permissions_custom_dots",
      "path": "textures/ui/permissions_custom_dots"
    },
    {
      "name": "mc/ui/permissions_custom_dots_hover",
      "path": "textures/ui/permissions_custom_dots_hover"
    },
    {
      "name": "mc/ui/permissions_member_star",
      "path": "textures/ui/permissions_member_star"
    },
    {
      "name": "mc/ui/permissions_member_star_hover",
      "path": "textures/ui/permissions_member_star_hover"
    },
    {
      "name": "mc/ui/permissions_op_crown",
      "path": "textures/ui/permissions_op_crown"
    },
    {
      "name": "mc/ui/permissions_op_crown_hover",
      "path": "textures/ui/permissions_op_crown_hover"
    },
    {
      "name": "mc/ui/permissions_player_fade_overlay",
      "path": "textures/ui/permissions_player_fade_overlay"
    },
    {
      "name": "mc/ui/permissions_visitor_hand",
      "path": "textures/ui/permissions_visitor_hand"
    },
    {
      "name": "mc/ui/permissions_visitor_hand_hover",
      "path": "textures/ui/permissions_visitor_hand_hover"
    },
    {
      "name": "mc/ui/persona_key_comp",
      "path": "textures/ui/persona_key_comp"
    },
    {
      "name": "mc/ui/photo_corner_bl",
      "path": "textures/ui/photo_corner_bl"
    },
    {
      "name": "mc/ui/photo_corner_br",
      "path": "textures/ui/photo_corner_br"
    },
    {
      "name": "mc/ui/photo_corner_tl",
      "path": "textures/ui/photo_corner_tl"
    },
    {
      "name": "mc/ui/photo_corner_tr",
      "path": "textures/ui/photo_corner_tr"
    },
    {
      "name": "mc/ui/Ping_Green",
      "path": "textures/ui/Ping_Green"
    },
    {
      "name": "mc/ui/Ping_Green_Dark",
      "path": "textures/ui/Ping_Green_Dark"
    },
    {
      "name": "mc/ui/Ping_Offline_Red",
      "path": "textures/ui/Ping_Offline_Red"
    },
    {
      "name": "mc/ui/Ping_Offline_Red_Dark",
      "path": "textures/ui/Ping_Offline_Red_Dark"
    },
    {
      "name": "mc/ui/Ping_Red",
      "path": "textures/ui/Ping_Red"
    },
    {
      "name": "mc/ui/Ping_Red_Dark",
      "path": "textures/ui/Ping_Red_Dark"
    },
    {
      "name": "mc/ui/Ping_Yellow",
      "path": "textures/ui/Ping_Yellow"
    },
    {
      "name": "mc/ui/Ping_Yellow_Dark",
      "path": "textures/ui/Ping_Yellow_Dark"
    },
    {
      "name": "mc/ui/pinksquare",
      "path": "textures/ui/pinksquare"
    },
    {
      "name": "mc/ui/pinktriangle",
      "path": "textures/ui/pinktriangle"
    },
    {
      "name": "mc/ui/pink_button_borderless_default",
      "path": "textures/ui/pink_button_borderless_default"
    },
    {
      "name": "mc/ui/pink_button_borderless_hover",
      "path": "textures/ui/pink_button_borderless_hover"
    },
    {
      "name": "mc/ui/pink_button_borderless_hover_pressed",
      "path": "textures/ui/pink_button_borderless_hover_pressed"
    },
    {
      "name": "mc/ui/pink_button_borderless_lighthoverflag",
      "path": "textures/ui/pink_button_borderless_lighthoverflag"
    },
    {
      "name": "mc/ui/pink_button_borderless_lightpressedflag",
      "path": "textures/ui/pink_button_borderless_lightpressedflag"
    },
    {
      "name": "mc/ui/pink_button_borderless_no_hover_pressed",
      "path": "textures/ui/pink_button_borderless_no_hover_pressed"
    },
    {
      "name": "mc/ui/PlaceholderStore",
      "path": "textures/ui/PlaceholderStore"
    },
    {
      "name": "mc/ui/player_offline_icon",
      "path": "textures/ui/player_offline_icon"
    },
    {
      "name": "mc/ui/player_online_icon",
      "path": "textures/ui/player_online_icon"
    },
    {
      "name": "mc/ui/player_preview_border",
      "path": "textures/ui/player_preview_border"
    },
    {
      "name": "mc/ui/plus",
      "path": "textures/ui/plus"
    },
    {
      "name": "mc/ui/pocket_button_default",
      "path": "textures/ui/pocket_button_default"
    },
    {
      "name": "mc/ui/pocket_button_hover",
      "path": "textures/ui/pocket_button_hover"
    },
    {
      "name": "mc/ui/pocket_button_pressed",
      "path": "textures/ui/pocket_button_pressed"
    },
    {
      "name": "mc/ui/pocket_tab_left_side",
      "path": "textures/ui/pocket_tab_left_side"
    },
    {
      "name": "mc/ui/pocket_tab_right_side",
      "path": "textures/ui/pocket_tab_right_side"
    },
    {
      "name": "mc/ui/pocket_ui_highlight_selected_slot",
      "path": "textures/ui/pocket_ui_highlight_selected_slot"
    },
    {
      "name": "mc/ui/pocket_ui_highlight_slot",
      "path": "textures/ui/pocket_ui_highlight_slot"
    },
    {
      "name": "mc/ui/pointer",
      "path": "textures/ui/pointer"
    },
    {
      "name": "mc/ui/poison_effect",
      "path": "textures/ui/poison_effect"
    },
    {
      "name": "mc/ui/poison_heart",
      "path": "textures/ui/poison_heart"
    },
    {
      "name": "mc/ui/poison_heart_flash",
      "path": "textures/ui/poison_heart_flash"
    },
    {
      "name": "mc/ui/poison_heart_flash_half",
      "path": "textures/ui/poison_heart_flash_half"
    },
    {
      "name": "mc/ui/poison_heart_half",
      "path": "textures/ui/poison_heart_half"
    },
    {
      "name": "mc/ui/portalBg",
      "path": "textures/ui/portalBg"
    },
    {
      "name": "mc/ui/postGradientSolid",
      "path": "textures/ui/postGradientSolid"
    },
    {
      "name": "mc/ui/profile_bg",
      "path": "textures/ui/profile_bg"
    },
    {
      "name": "mc/ui/profile_glyph",
      "path": "textures/ui/profile_glyph"
    },
    {
      "name": "mc/ui/profile_glyph_color",
      "path": "textures/ui/profile_glyph_color"
    },
    {
      "name": "mc/ui/profile_new_look",
      "path": "textures/ui/profile_new_look"
    },
    {
      "name": "mc/ui/profile_new_look_small",
      "path": "textures/ui/profile_new_look_small"
    },
    {
      "name": "mc/ui/progress_bar_simple",
      "path": "textures/ui/progress_bar_simple"
    },
    {
      "name": "mc/ui/promotion_slot",
      "path": "textures/ui/promotion_slot"
    },
    {
      "name": "mc/ui/promo_background",
      "path": "textures/ui/promo_background"
    },
    {
      "name": "mc/ui/promo_bee",
      "path": "textures/ui/promo_bee"
    },
    {
      "name": "mc/ui/promo_chicken",
      "path": "textures/ui/promo_chicken"
    },
    {
      "name": "mc/ui/promo_corner_left",
      "path": "textures/ui/promo_corner_left"
    },
    {
      "name": "mc/ui/promo_corner_right",
      "path": "textures/ui/promo_corner_right"
    },
    {
      "name": "mc/ui/promo_creeper",
      "path": "textures/ui/promo_creeper"
    },
    {
      "name": "mc/ui/promo_gift_big",
      "path": "textures/ui/promo_gift_big"
    },
    {
      "name": "mc/ui/promo_gift_small_blue",
      "path": "textures/ui/promo_gift_small_blue"
    },
    {
      "name": "mc/ui/promo_gift_small_green",
      "path": "textures/ui/promo_gift_small_green"
    },
    {
      "name": "mc/ui/promo_gift_small_pink",
      "path": "textures/ui/promo_gift_small_pink"
    },
    {
      "name": "mc/ui/promo_gift_small_yellow",
      "path": "textures/ui/promo_gift_small_yellow"
    },
    {
      "name": "mc/ui/promo_holiday_gift_long",
      "path": "textures/ui/promo_holiday_gift_long"
    },
    {
      "name": "mc/ui/promo_holiday_gift_small",
      "path": "textures/ui/promo_holiday_gift_small"
    },
    {
      "name": "mc/ui/promo_pig_sheep",
      "path": "textures/ui/promo_pig_sheep"
    },
    {
      "name": "mc/ui/promo_spider",
      "path": "textures/ui/promo_spider"
    },
    {
      "name": "mc/ui/promo_wolf",
      "path": "textures/ui/promo_wolf"
    },
    {
      "name": "mc/ui/ps4_bumper_left",
      "path": "textures/ui/ps4_bumper_left"
    },
    {
      "name": "mc/ui/ps4_bumper_right",
      "path": "textures/ui/ps4_bumper_right"
    },
    {
      "name": "mc/ui/ps4_dpad_down",
      "path": "textures/ui/ps4_dpad_down"
    },
    {
      "name": "mc/ui/ps4_dpad_left",
      "path": "textures/ui/ps4_dpad_left"
    },
    {
      "name": "mc/ui/ps4_dpad_right",
      "path": "textures/ui/ps4_dpad_right"
    },
    {
      "name": "mc/ui/ps4_dpad_up",
      "path": "textures/ui/ps4_dpad_up"
    },
    {
      "name": "mc/ui/ps4_face_button_down",
      "path": "textures/ui/ps4_face_button_down"
    },
    {
      "name": "mc/ui/ps4_face_button_left",
      "path": "textures/ui/ps4_face_button_left"
    },
    {
      "name": "mc/ui/ps4_face_button_right",
      "path": "textures/ui/ps4_face_button_right"
    },
    {
      "name": "mc/ui/ps4_face_button_up",
      "path": "textures/ui/ps4_face_button_up"
    },
    {
      "name": "mc/ui/ps4_left_trigger",
      "path": "textures/ui/ps4_left_trigger"
    },
    {
      "name": "mc/ui/ps4_right_trigger",
      "path": "textures/ui/ps4_right_trigger"
    },
    {
      "name": "mc/ui/ps4_select_button",
      "path": "textures/ui/ps4_select_button"
    },
    {
      "name": "mc/ui/ps4_stick_left",
      "path": "textures/ui/ps4_stick_left"
    },
    {
      "name": "mc/ui/ps4_stick_right",
      "path": "textures/ui/ps4_stick_right"
    },
    {
      "name": "mc/ui/ps4_touchpad",
      "path": "textures/ui/ps4_touchpad"
    },
    {
      "name": "mc/ui/purple",
      "path": "textures/ui/purple"
    },
    {
      "name": "mc/ui/purpleBorder",
      "path": "textures/ui/purpleBorder"
    },
    {
      "name": "mc/ui/purple_gradient",
      "path": "textures/ui/purple_gradient"
    },
    {
      "name": "mc/ui/purtle",
      "path": "textures/ui/purtle"
    },
    {
      "name": "mc/ui/pyramid_level_1",
      "path": "textures/ui/pyramid_level_1"
    },
    {
      "name": "mc/ui/pyramid_level_2",
      "path": "textures/ui/pyramid_level_2"
    },
    {
      "name": "mc/ui/pyramid_level_3",
      "path": "textures/ui/pyramid_level_3"
    },
    {
      "name": "mc/ui/pyramid_level_4",
      "path": "textures/ui/pyramid_level_4"
    },
    {
      "name": "mc/ui/qr_code_bees",
      "path": "textures/ui/qr_code_bees"
    },
    {
      "name": "mc/ui/radiobox_filled",
      "path": "textures/ui/radiobox_filled"
    },
    {
      "name": "mc/ui/radiobox_unfilled",
      "path": "textures/ui/radiobox_unfilled"
    },
    {
      "name": "mc/ui/radio_checked",
      "path": "textures/ui/radio_checked"
    },
    {
      "name": "mc/ui/radio_checked_hover",
      "path": "textures/ui/radio_checked_hover"
    },
    {
      "name": "mc/ui/radio_off",
      "path": "textures/ui/radio_off"
    },
    {
      "name": "mc/ui/radio_off_hover",
      "path": "textures/ui/radio_off_hover"
    },
    {
      "name": "mc/ui/radio_on",
      "path": "textures/ui/radio_on"
    },
    {
      "name": "mc/ui/radio_on_hover",
      "path": "textures/ui/radio_on_hover"
    },
    {
      "name": "mc/ui/random_dice",
      "path": "textures/ui/random_dice"
    },
    {
      "name": "mc/ui/rarity_common",
      "path": "textures/ui/rarity_common"
    },
    {
      "name": "mc/ui/rarity_common_short",
      "path": "textures/ui/rarity_common_short"
    },
    {
      "name": "mc/ui/rarity_epic",
      "path": "textures/ui/rarity_epic"
    },
    {
      "name": "mc/ui/rarity_epic_short",
      "path": "textures/ui/rarity_epic_short"
    },
    {
      "name": "mc/ui/rarity_legendary",
      "path": "textures/ui/rarity_legendary"
    },
    {
      "name": "mc/ui/rarity_legendary_short",
      "path": "textures/ui/rarity_legendary_short"
    },
    {
      "name": "mc/ui/rarity_rare",
      "path": "textures/ui/rarity_rare"
    },
    {
      "name": "mc/ui/rarity_rare_short",
      "path": "textures/ui/rarity_rare_short"
    },
    {
      "name": "mc/ui/rarity_uncommon",
      "path": "textures/ui/rarity_uncommon"
    },
    {
      "name": "mc/ui/rarity_uncommon_short",
      "path": "textures/ui/rarity_uncommon_short"
    },
    {
      "name": "mc/ui/ratings_fullstar",
      "path": "textures/ui/ratings_fullstar"
    },
    {
      "name": "mc/ui/ratings_nostar",
      "path": "textures/ui/ratings_nostar"
    },
    {
      "name": "mc/ui/rating_screen",
      "path": "textures/ui/rating_screen"
    },
    {
      "name": "mc/ui/RealmDemoScreen",
      "path": "textures/ui/RealmDemoScreen"
    },
    {
      "name": "mc/ui/realmflagSmooth",
      "path": "textures/ui/realmflagSmooth"
    },
    {
      "name": "mc/ui/realmflagtriangleSmooth",
      "path": "textures/ui/realmflagtriangleSmooth"
    },
    {
      "name": "mc/ui/realmPortalSmall",
      "path": "textures/ui/realmPortalSmall"
    },
    {
      "name": "mc/ui/realmsContent",
      "path": "textures/ui/realmsContent"
    },
    {
      "name": "mc/ui/realmsContentHover",
      "path": "textures/ui/realmsContentHover"
    },
    {
      "name": "mc/ui/realmsContentPressed",
      "path": "textures/ui/realmsContentPressed"
    },
    {
      "name": "mc/ui/realmsIcon",
      "path": "textures/ui/realmsIcon"
    },
    {
      "name": "mc/ui/realmsparkle",
      "path": "textures/ui/realmsparkle"
    },
    {
      "name": "mc/ui/realmsparkle1",
      "path": "textures/ui/realmsparkle1"
    },
    {
      "name": "mc/ui/realms_art_icon",
      "path": "textures/ui/realms_art_icon"
    },
    {
      "name": "mc/ui/realms_chevron_play",
      "path": "textures/ui/realms_chevron_play"
    },
    {
      "name": "mc/ui/realms_gradient_top",
      "path": "textures/ui/realms_gradient_top"
    },
    {
      "name": "mc/ui/realms_green_check",
      "path": "textures/ui/realms_green_check"
    },
    {
      "name": "mc/ui/realms_key_art",
      "path": "textures/ui/realms_key_art"
    },
    {
      "name": "mc/ui/realms_particles",
      "path": "textures/ui/realms_particles"
    },
    {
      "name": "mc/ui/realms_plus_hover",
      "path": "textures/ui/realms_plus_hover"
    },
    {
      "name": "mc/ui/realms_plus_normal",
      "path": "textures/ui/realms_plus_normal"
    },
    {
      "name": "mc/ui/realms_red_x",
      "path": "textures/ui/realms_red_x"
    },
    {
      "name": "mc/ui/realms_slot_check",
      "path": "textures/ui/realms_slot_check"
    },
    {
      "name": "mc/ui/realms_text_background",
      "path": "textures/ui/realms_text_background"
    },
    {
      "name": "mc/ui/realms_title",
      "path": "textures/ui/realms_title"
    },
    {
      "name": "mc/ui/realm_banner_big",
      "path": "textures/ui/realm_banner_big"
    },
    {
      "name": "mc/ui/realm_banner_small",
      "path": "textures/ui/realm_banner_small"
    },
    {
      "name": "mc/ui/realm_icon_small",
      "path": "textures/ui/realm_icon_small"
    },
    {
      "name": "mc/ui/recap_glyph_2x",
      "path": "textures/ui/recap_glyph_2x"
    },
    {
      "name": "mc/ui/recap_glyph_color_2x",
      "path": "textures/ui/recap_glyph_color_2x"
    },
    {
      "name": "mc/ui/recap_glyph_desaturated",
      "path": "textures/ui/recap_glyph_desaturated"
    },
    {
      "name": "mc/ui/recipe_back_panel",
      "path": "textures/ui/recipe_back_panel"
    },
    {
      "name": "mc/ui/recipe_book_button_borderless_light",
      "path": "textures/ui/recipe_book_button_borderless_light"
    },
    {
      "name": "mc/ui/recipe_book_button_borderless_lighthover",
      "path": "textures/ui/recipe_book_button_borderless_lighthover"
    },
    {
      "name": "mc/ui/recipe_book_button_borderless_lightpressed",
      "path": "textures/ui/recipe_book_button_borderless_lightpressed"
    },
    {
      "name": "mc/ui/recipe_book_button_borderless_lightpressednohover",
      "path": "textures/ui/recipe_book_button_borderless_lightpressednohover"
    },
    {
      "name": "mc/ui/recipe_book_collapse_icon",
      "path": "textures/ui/recipe_book_collapse_icon"
    },
    {
      "name": "mc/ui/recipe_book_dark_button",
      "path": "textures/ui/recipe_book_dark_button"
    },
    {
      "name": "mc/ui/recipe_book_dark_button_pressed",
      "path": "textures/ui/recipe_book_dark_button_pressed"
    },
    {
      "name": "mc/ui/recipe_book_expand_dots_in",
      "path": "textures/ui/recipe_book_expand_dots_in"
    },
    {
      "name": "mc/ui/recipe_book_expand_dots_in_hover",
      "path": "textures/ui/recipe_book_expand_dots_in_hover"
    },
    {
      "name": "mc/ui/recipe_book_expand_dots_out",
      "path": "textures/ui/recipe_book_expand_dots_out"
    },
    {
      "name": "mc/ui/recipe_book_expand_dots_out_hover",
      "path": "textures/ui/recipe_book_expand_dots_out_hover"
    },
    {
      "name": "mc/ui/recipe_book_expand_icon",
      "path": "textures/ui/recipe_book_expand_icon"
    },
    {
      "name": "mc/ui/recipe_book_group_bg",
      "path": "textures/ui/recipe_book_group_bg"
    },
    {
      "name": "mc/ui/recipe_book_group_collapsed",
      "path": "textures/ui/recipe_book_group_collapsed"
    },
    {
      "name": "mc/ui/recipe_book_group_expanded",
      "path": "textures/ui/recipe_book_group_expanded"
    },
    {
      "name": "mc/ui/recipe_book_icon",
      "path": "textures/ui/recipe_book_icon"
    },
    {
      "name": "mc/ui/recipe_book_item_bg",
      "path": "textures/ui/recipe_book_item_bg"
    },
    {
      "name": "mc/ui/recipe_book_light_button",
      "path": "textures/ui/recipe_book_light_button"
    },
    {
      "name": "mc/ui/recipe_book_light_button_pressed",
      "path": "textures/ui/recipe_book_light_button_pressed"
    },
    {
      "name": "mc/ui/recipe_book_pane_bg",
      "path": "textures/ui/recipe_book_pane_bg"
    },
    {
      "name": "mc/ui/recipe_book_red",
      "path": "textures/ui/recipe_book_red"
    },
    {
      "name": "mc/ui/recipe_book_red_button",
      "path": "textures/ui/recipe_book_red_button"
    },
    {
      "name": "mc/ui/recipe_book_red_button_pressed",
      "path": "textures/ui/recipe_book_red_button_pressed"
    },
    {
      "name": "mc/ui/recipe_book_side_toggle_dark",
      "path": "textures/ui/recipe_book_side_toggle_dark"
    },
    {
      "name": "mc/ui/recipe_book_side_toggle_dark_hover",
      "path": "textures/ui/recipe_book_side_toggle_dark_hover"
    },
    {
      "name": "mc/ui/recipe_book_touch_cell_selected",
      "path": "textures/ui/recipe_book_touch_cell_selected"
    },
    {
      "name": "mc/ui/recolorable_background",
      "path": "textures/ui/recolorable_background"
    },
    {
      "name": "mc/ui/redX1",
      "path": "textures/ui/redX1"
    },
    {
      "name": "mc/ui/red_dot",
      "path": "textures/ui/red_dot"
    },
    {
      "name": "mc/ui/red_slash",
      "path": "textures/ui/red_slash"
    },
    {
      "name": "mc/ui/refresh",
      "path": "textures/ui/refresh"
    },
    {
      "name": "mc/ui/refresh_hover",
      "path": "textures/ui/refresh_hover"
    },
    {
      "name": "mc/ui/refresh_light",
      "path": "textures/ui/refresh_light"
    },
    {
      "name": "mc/ui/regeneration_effect",
      "path": "textures/ui/regeneration_effect"
    },
    {
      "name": "mc/ui/RepeatSquare",
      "path": "textures/ui/RepeatSquare"
    },
    {
      "name": "mc/ui/resistance_effect",
      "path": "textures/ui/resistance_effect"
    },
    {
      "name": "mc/ui/ribbon_bar_text_background_hover",
      "path": "textures/ui/ribbon_bar_text_background_hover"
    },
    {
      "name": "mc/ui/Rotate",
      "path": "textures/ui/Rotate"
    },
    {
      "name": "mc/ui/RTX_Label",
      "path": "textures/ui/RTX_Label"
    },
    {
      "name": "mc/ui/RTX_Sparkle",
      "path": "textures/ui/RTX_Sparkle"
    },
    {
      "name": "mc/ui/saleflag",
      "path": "textures/ui/saleflag"
    },
    {
      "name": "mc/ui/saleflagtriangle",
      "path": "textures/ui/saleflagtriangle"
    },
    {
      "name": "mc/ui/saleflagtrianglebeveldefault",
      "path": "textures/ui/saleflagtrianglebeveldefault"
    },
    {
      "name": "mc/ui/saleflagtrianglebeveldefault_large",
      "path": "textures/ui/saleflagtrianglebeveldefault_large"
    },
    {
      "name": "mc/ui/saleflagtrianglebevelpress",
      "path": "textures/ui/saleflagtrianglebevelpress"
    },
    {
      "name": "mc/ui/saleflagtrianglebevelpress_large",
      "path": "textures/ui/saleflagtrianglebevelpress_large"
    },
    {
      "name": "mc/ui/saleribbon",
      "path": "textures/ui/saleribbon"
    },
    {
      "name": "mc/ui/sale_button_borderless_lighthover",
      "path": "textures/ui/sale_button_borderless_lighthover"
    },
    {
      "name": "mc/ui/sale_button_borderless_lighthoverflag",
      "path": "textures/ui/sale_button_borderless_lighthoverflag"
    },
    {
      "name": "mc/ui/sale_button_borderless_lightpressed",
      "path": "textures/ui/sale_button_borderless_lightpressed"
    },
    {
      "name": "mc/ui/sale_button_borderless_lightpressedflag",
      "path": "textures/ui/sale_button_borderless_lightpressedflag"
    },
    {
      "name": "mc/ui/Scaffolding",
      "path": "textures/ui/Scaffolding"
    },
    {
      "name": "mc/ui/scoreboard_list_background",
      "path": "textures/ui/scoreboard_list_background"
    },
    {
      "name": "mc/ui/screenshot_frame",
      "path": "textures/ui/screenshot_frame"
    },
    {
      "name": "mc/ui/screen_background",
      "path": "textures/ui/screen_background"
    },
    {
      "name": "mc/ui/screen_realms_plus_background",
      "path": "textures/ui/screen_realms_plus_background"
    },
    {
      "name": "mc/ui/ScrollBox",
      "path": "textures/ui/ScrollBox"
    },
    {
      "name": "mc/ui/ScrollGutterWithBG",
      "path": "textures/ui/ScrollGutterWithBG"
    },
    {
      "name": "mc/ui/ScrollHandle",
      "path": "textures/ui/ScrollHandle"
    },
    {
      "name": "mc/ui/ScrollRail",
      "path": "textures/ui/ScrollRail"
    },
    {
      "name": "mc/ui/second_of_three",
      "path": "textures/ui/second_of_three"
    },
    {
      "name": "mc/ui/second_of_two",
      "path": "textures/ui/second_of_two"
    },
    {
      "name": "mc/ui/seeds",
      "path": "textures/ui/seeds"
    },
    {
      "name": "mc/ui/selected_hotbar_slot",
      "path": "textures/ui/selected_hotbar_slot"
    },
    {
      "name": "mc/ui/send_icon",
      "path": "textures/ui/send_icon"
    },
    {
      "name": "mc/ui/servers",
      "path": "textures/ui/servers"
    },
    {
      "name": "mc/ui/settings_glyph_2x",
      "path": "textures/ui/settings_glyph_2x"
    },
    {
      "name": "mc/ui/settings_glyph_color_2x",
      "path": "textures/ui/settings_glyph_color_2x"
    },
    {
      "name": "mc/ui/shadow",
      "path": "textures/ui/shadow"
    },
    {
      "name": "mc/ui/share_apple",
      "path": "textures/ui/share_apple"
    },
    {
      "name": "mc/ui/share_google",
      "path": "textures/ui/share_google"
    },
    {
      "name": "mc/ui/share_microsoft",
      "path": "textures/ui/share_microsoft"
    },
    {
      "name": "mc/ui/sign",
      "path": "textures/ui/sign"
    },
    {
      "name": "mc/ui/sign_acacia",
      "path": "textures/ui/sign_acacia"
    },
    {
      "name": "mc/ui/sign_birch",
      "path": "textures/ui/sign_birch"
    },
    {
      "name": "mc/ui/sign_crimson",
      "path": "textures/ui/sign_crimson"
    },
    {
      "name": "mc/ui/sign_darkoak",
      "path": "textures/ui/sign_darkoak"
    },
    {
      "name": "mc/ui/sign_in_prompts_my_content",
      "path": "textures/ui/sign_in_prompts_my_content"
    },
    {
      "name": "mc/ui/sign_jungle",
      "path": "textures/ui/sign_jungle"
    },
    {
      "name": "mc/ui/sign_spruce",
      "path": "textures/ui/sign_spruce"
    },
    {
      "name": "mc/ui/sign_warped",
      "path": "textures/ui/sign_warped"
    },
    {
      "name": "mc/ui/slider_background",
      "path": "textures/ui/slider_background"
    },
    {
      "name": "mc/ui/slider_background_hover",
      "path": "textures/ui/slider_background_hover"
    },
    {
      "name": "mc/ui/slider_border",
      "path": "textures/ui/slider_border"
    },
    {
      "name": "mc/ui/slider_button_default",
      "path": "textures/ui/slider_button_default"
    },
    {
      "name": "mc/ui/slider_button_hover",
      "path": "textures/ui/slider_button_hover"
    },
    {
      "name": "mc/ui/slider_button_indent",
      "path": "textures/ui/slider_button_indent"
    },
    {
      "name": "mc/ui/slider_button_locked",
      "path": "textures/ui/slider_button_locked"
    },
    {
      "name": "mc/ui/slider_locked_transparent_fade",
      "path": "textures/ui/slider_locked_transparent_fade"
    },
    {
      "name": "mc/ui/slider_progress",
      "path": "textures/ui/slider_progress"
    },
    {
      "name": "mc/ui/slider_progress_hover",
      "path": "textures/ui/slider_progress_hover"
    },
    {
      "name": "mc/ui/slider_step_background",
      "path": "textures/ui/slider_step_background"
    },
    {
      "name": "mc/ui/slider_step_background_hover",
      "path": "textures/ui/slider_step_background_hover"
    },
    {
      "name": "mc/ui/slider_step_progress",
      "path": "textures/ui/slider_step_progress"
    },
    {
      "name": "mc/ui/slider_step_progress_hover",
      "path": "textures/ui/slider_step_progress_hover"
    },
    {
      "name": "mc/ui/slots_bg",
      "path": "textures/ui/slots_bg"
    },
    {
      "name": "mc/ui/slot_sale",
      "path": "textures/ui/slot_sale"
    },
    {
      "name": "mc/ui/slowness_effect",
      "path": "textures/ui/slowness_effect"
    },
    {
      "name": "mc/ui/slow_falling_effect",
      "path": "textures/ui/slow_falling_effect"
    },
    {
      "name": "mc/ui/smallerHeight",
      "path": "textures/ui/smallerHeight"
    },
    {
      "name": "mc/ui/smallHeight",
      "path": "textures/ui/smallHeight"
    },
    {
      "name": "mc/ui/small_fish_bevel",
      "path": "textures/ui/small_fish_bevel"
    },
    {
      "name": "mc/ui/smithing-table-plus",
      "path": "textures/ui/smithing-table-plus"
    },
    {
      "name": "mc/ui/smithing_icon",
      "path": "textures/ui/smithing_icon"
    },
    {
      "name": "mc/ui/smithing_material_slot_overlay",
      "path": "textures/ui/smithing_material_slot_overlay"
    },
    {
      "name": "mc/ui/sneak",
      "path": "textures/ui/sneak"
    },
    {
      "name": "mc/ui/sneak_pressed",
      "path": "textures/ui/sneak_pressed"
    },
    {
      "name": "mc/ui/sound_glyph",
      "path": "textures/ui/sound_glyph"
    },
    {
      "name": "mc/ui/sound_glyph_2x",
      "path": "textures/ui/sound_glyph_2x"
    },
    {
      "name": "mc/ui/sound_glyph_color",
      "path": "textures/ui/sound_glyph_color"
    },
    {
      "name": "mc/ui/sound_glyph_color_2x",
      "path": "textures/ui/sound_glyph_color_2x"
    },
    {
      "name": "mc/ui/speed_effect",
      "path": "textures/ui/speed_effect"
    },
    {
      "name": "mc/ui/sprint",
      "path": "textures/ui/sprint"
    },
    {
      "name": "mc/ui/sprint_disable",
      "path": "textures/ui/sprint_disable"
    },
    {
      "name": "mc/ui/sprint_pressed",
      "path": "textures/ui/sprint_pressed"
    },
    {
      "name": "mc/ui/spyglass_flat",
      "path": "textures/ui/spyglass_flat"
    },
    {
      "name": "mc/ui/spyglass_scope",
      "path": "textures/ui/spyglass_scope"
    },
    {
      "name": "mc/ui/square_image_border_white",
      "path": "textures/ui/square_image_border_white"
    },
    {
      "name": "mc/ui/stack_progress_bar_down_arrow",
      "path": "textures/ui/stack_progress_bar_down_arrow"
    },
    {
      "name": "mc/ui/stack_progress_bar_fill",
      "path": "textures/ui/stack_progress_bar_fill"
    },
    {
      "name": "mc/ui/stack_progress_bar_left_side_arrow",
      "path": "textures/ui/stack_progress_bar_left_side_arrow"
    },
    {
      "name": "mc/ui/stack_progress_bar_right_side_arrow",
      "path": "textures/ui/stack_progress_bar_right_side_arrow"
    },
    {
      "name": "mc/ui/stack_progress_bar_up_arrow",
      "path": "textures/ui/stack_progress_bar_up_arrow"
    },
    {
      "name": "mc/ui/storageIcon",
      "path": "textures/ui/storageIcon"
    },
    {
      "name": "mc/ui/storageIconColor",
      "path": "textures/ui/storageIconColor"
    },
    {
      "name": "mc/ui/StoreTopBar",
      "path": "textures/ui/StoreTopBar"
    },
    {
      "name": "mc/ui/StoreTopBarFiller",
      "path": "textures/ui/StoreTopBarFiller"
    },
    {
      "name": "mc/ui/storexblsignin",
      "path": "textures/ui/storexblsignin"
    },
    {
      "name": "mc/ui/store_background",
      "path": "textures/ui/store_background"
    },
    {
      "name": "mc/ui/store_banner_no_border",
      "path": "textures/ui/store_banner_no_border"
    },
    {
      "name": "mc/ui/store_filter_icon",
      "path": "textures/ui/store_filter_icon"
    },
    {
      "name": "mc/ui/store_home_icon",
      "path": "textures/ui/store_home_icon"
    },
    {
      "name": "mc/ui/store_play_button",
      "path": "textures/ui/store_play_button"
    },
    {
      "name": "mc/ui/store_play_button_mask",
      "path": "textures/ui/store_play_button_mask"
    },
    {
      "name": "mc/ui/store_sort_icon",
      "path": "textures/ui/store_sort_icon"
    },
    {
      "name": "mc/ui/strength_effect",
      "path": "textures/ui/strength_effect"
    },
    {
      "name": "mc/ui/strikethru",
      "path": "textures/ui/strikethru"
    },
    {
      "name": "mc/ui/structure_block",
      "path": "textures/ui/structure_block"
    },
    {
      "name": "mc/ui/structure_block_corner",
      "path": "textures/ui/structure_block_corner"
    },
    {
      "name": "mc/ui/structure_block_data",
      "path": "textures/ui/structure_block_data"
    },
    {
      "name": "mc/ui/structure_block_export",
      "path": "textures/ui/structure_block_export"
    },
    {
      "name": "mc/ui/structure_block_load",
      "path": "textures/ui/structure_block_load"
    },
    {
      "name": "mc/ui/structure_block_save",
      "path": "textures/ui/structure_block_save"
    },
    {
      "name": "mc/ui/subscription_glyph",
      "path": "textures/ui/subscription_glyph"
    },
    {
      "name": "mc/ui/subscription_glyph_color",
      "path": "textures/ui/subscription_glyph_color"
    },
    {
      "name": "mc/ui/sunset_keyart",
      "path": "textures/ui/sunset_keyart"
    },
    {
      "name": "mc/ui/sunset_pending_keyart",
      "path": "textures/ui/sunset_pending_keyart"
    },
    {
      "name": "mc/ui/switch_accounts",
      "path": "textures/ui/switch_accounts"
    },
    {
      "name": "mc/ui/switch_bumper_left",
      "path": "textures/ui/switch_bumper_left"
    },
    {
      "name": "mc/ui/switch_bumper_right",
      "path": "textures/ui/switch_bumper_right"
    },
    {
      "name": "mc/ui/switch_circle_button",
      "path": "textures/ui/switch_circle_button"
    },
    {
      "name": "mc/ui/switch_dpad_down",
      "path": "textures/ui/switch_dpad_down"
    },
    {
      "name": "mc/ui/switch_dpad_left",
      "path": "textures/ui/switch_dpad_left"
    },
    {
      "name": "mc/ui/switch_dpad_right",
      "path": "textures/ui/switch_dpad_right"
    },
    {
      "name": "mc/ui/switch_dpad_up",
      "path": "textures/ui/switch_dpad_up"
    },
    {
      "name": "mc/ui/switch_face_button_down",
      "path": "textures/ui/switch_face_button_down"
    },
    {
      "name": "mc/ui/switch_face_button_left",
      "path": "textures/ui/switch_face_button_left"
    },
    {
      "name": "mc/ui/switch_face_button_right",
      "path": "textures/ui/switch_face_button_right"
    },
    {
      "name": "mc/ui/switch_face_button_up",
      "path": "textures/ui/switch_face_button_up"
    },
    {
      "name": "mc/ui/switch_home_button",
      "path": "textures/ui/switch_home_button"
    },
    {
      "name": "mc/ui/switch_left_trigger",
      "path": "textures/ui/switch_left_trigger"
    },
    {
      "name": "mc/ui/switch_right_trigger",
      "path": "textures/ui/switch_right_trigger"
    },
    {
      "name": "mc/ui/switch_select_button",
      "path": "textures/ui/switch_select_button"
    },
    {
      "name": "mc/ui/switch_sl_button",
      "path": "textures/ui/switch_sl_button"
    },
    {
      "name": "mc/ui/switch_sr_button",
      "path": "textures/ui/switch_sr_button"
    },
    {
      "name": "mc/ui/switch_start_button",
      "path": "textures/ui/switch_start_button"
    },
    {
      "name": "mc/ui/switch_stick_left",
      "path": "textures/ui/switch_stick_left"
    },
    {
      "name": "mc/ui/switch_stick_right",
      "path": "textures/ui/switch_stick_right"
    },
    {
      "name": "mc/ui/switch_touchpad",
      "path": "textures/ui/switch_touchpad"
    },
    {
      "name": "mc/ui/sword",
      "path": "textures/ui/sword"
    },
    {
      "name": "mc/ui/TabLeftBack",
      "path": "textures/ui/TabLeftBack"
    },
    {
      "name": "mc/ui/TabLeftBackBottomMost",
      "path": "textures/ui/TabLeftBackBottomMost"
    },
    {
      "name": "mc/ui/TabLeftBackBottomMostHover",
      "path": "textures/ui/TabLeftBackBottomMostHover"
    },
    {
      "name": "mc/ui/TabLeftBackHover",
      "path": "textures/ui/TabLeftBackHover"
    },
    {
      "name": "mc/ui/TabLeftBackTopMost",
      "path": "textures/ui/TabLeftBackTopMost"
    },
    {
      "name": "mc/ui/TabLeftBackTopMostHover",
      "path": "textures/ui/TabLeftBackTopMostHover"
    },
    {
      "name": "mc/ui/TabLeftFront",
      "path": "textures/ui/TabLeftFront"
    },
    {
      "name": "mc/ui/TabLeftFrontBottomMost",
      "path": "textures/ui/TabLeftFrontBottomMost"
    },
    {
      "name": "mc/ui/TabLeftFrontBottomMostHover",
      "path": "textures/ui/TabLeftFrontBottomMostHover"
    },
    {
      "name": "mc/ui/TabLeftFrontHover",
      "path": "textures/ui/TabLeftFrontHover"
    },
    {
      "name": "mc/ui/TabLeftFrontTopMost",
      "path": "textures/ui/TabLeftFrontTopMost"
    },
    {
      "name": "mc/ui/TabLeftFrontTopMostHover",
      "path": "textures/ui/TabLeftFrontTopMostHover"
    },
    {
      "name": "mc/ui/TabRightBack",
      "path": "textures/ui/TabRightBack"
    },
    {
      "name": "mc/ui/TabRightBackBottomMost",
      "path": "textures/ui/TabRightBackBottomMost"
    },
    {
      "name": "mc/ui/TabRightBackBottomMostHover",
      "path": "textures/ui/TabRightBackBottomMostHover"
    },
    {
      "name": "mc/ui/TabRightBackHover",
      "path": "textures/ui/TabRightBackHover"
    },
    {
      "name": "mc/ui/TabRightBackTopMost",
      "path": "textures/ui/TabRightBackTopMost"
    },
    {
      "name": "mc/ui/TabRightBackTopMostHover",
      "path": "textures/ui/TabRightBackTopMostHover"
    },
    {
      "name": "mc/ui/TabRightFront",
      "path": "textures/ui/TabRightFront"
    },
    {
      "name": "mc/ui/TabRightFrontBottomMost",
      "path": "textures/ui/TabRightFrontBottomMost"
    },
    {
      "name": "mc/ui/TabRightFrontBottomMostHover",
      "path": "textures/ui/TabRightFrontBottomMostHover"
    },
    {
      "name": "mc/ui/TabRightFrontHover",
      "path": "textures/ui/TabRightFrontHover"
    },
    {
      "name": "mc/ui/TabRightFrontTopMost",
      "path": "textures/ui/TabRightFrontTopMost"
    },
    {
      "name": "mc/ui/TabRightFrontTopMostHover",
      "path": "textures/ui/TabRightFrontTopMostHover"
    },
    {
      "name": "mc/ui/TabTopBack",
      "path": "textures/ui/TabTopBack"
    },
    {
      "name": "mc/ui/TabTopBackHover",
      "path": "textures/ui/TabTopBackHover"
    },
    {
      "name": "mc/ui/TabTopBackLeftMost",
      "path": "textures/ui/TabTopBackLeftMost"
    },
    {
      "name": "mc/ui/TabTopBackLeftMostHover",
      "path": "textures/ui/TabTopBackLeftMostHover"
    },
    {
      "name": "mc/ui/TabTopBackRightMost",
      "path": "textures/ui/TabTopBackRightMost"
    },
    {
      "name": "mc/ui/TabTopBackRightMostDark",
      "path": "textures/ui/TabTopBackRightMostDark"
    },
    {
      "name": "mc/ui/TabTopBackRightMostDarkHover",
      "path": "textures/ui/TabTopBackRightMostDarkHover"
    },
    {
      "name": "mc/ui/TabTopBackRightMostHover",
      "path": "textures/ui/TabTopBackRightMostHover"
    },
    {
      "name": "mc/ui/TabTopFront",
      "path": "textures/ui/TabTopFront"
    },
    {
      "name": "mc/ui/TabTopFrontHover",
      "path": "textures/ui/TabTopFrontHover"
    },
    {
      "name": "mc/ui/TabTopFrontLeftMost",
      "path": "textures/ui/TabTopFrontLeftMost"
    },
    {
      "name": "mc/ui/TabTopFrontLeftMostHover",
      "path": "textures/ui/TabTopFrontLeftMostHover"
    },
    {
      "name": "mc/ui/TabTopFrontRightMost",
      "path": "textures/ui/TabTopFrontRightMost"
    },
    {
      "name": "mc/ui/TabTopFrontRightMostHover",
      "path": "textures/ui/TabTopFrontRightMostHover"
    },
    {
      "name": "mc/ui/tallHeight",
      "path": "textures/ui/tallHeight"
    },
    {
      "name": "mc/ui/teams_icon",
      "path": "textures/ui/teams_icon"
    },
    {
      "name": "mc/ui/templates_slot_overlay",
      "path": "textures/ui/templates_slot_overlay"
    },
    {
      "name": "mc/ui/text_color_paintbrush",
      "path": "textures/ui/text_color_paintbrush"
    },
    {
      "name": "mc/ui/text_color_paintbrush_overlay",
      "path": "textures/ui/text_color_paintbrush_overlay"
    },
    {
      "name": "mc/ui/text_edit_base",
      "path": "textures/ui/text_edit_base"
    },
    {
      "name": "mc/ui/text_edit_hover",
      "path": "textures/ui/text_edit_hover"
    },
    {
      "name": "mc/ui/text_label_box",
      "path": "textures/ui/text_label_box"
    },
    {
      "name": "mc/ui/thinArm",
      "path": "textures/ui/thinArm"
    },
    {
      "name": "mc/ui/ThinPlus",
      "path": "textures/ui/ThinPlus"
    },
    {
      "name": "mc/ui/thin_dialog",
      "path": "textures/ui/thin_dialog"
    },
    {
      "name": "mc/ui/third_of_three",
      "path": "textures/ui/third_of_three"
    },
    {
      "name": "mc/ui/thumbnail_classic",
      "path": "textures/ui/thumbnail_classic"
    },
    {
      "name": "mc/ui/thumbnail_crosshair",
      "path": "textures/ui/thumbnail_crosshair"
    },
    {
      "name": "mc/ui/thumbnail_touch",
      "path": "textures/ui/thumbnail_touch"
    },
    {
      "name": "mc/ui/timer",
      "path": "textures/ui/timer"
    },
    {
      "name": "mc/ui/time_1sunrise",
      "path": "textures/ui/time_1sunrise"
    },
    {
      "name": "mc/ui/time_2day",
      "path": "textures/ui/time_2day"
    },
    {
      "name": "mc/ui/time_3noon",
      "path": "textures/ui/time_3noon"
    },
    {
      "name": "mc/ui/time_4sunset",
      "path": "textures/ui/time_4sunset"
    },
    {
      "name": "mc/ui/time_5night",
      "path": "textures/ui/time_5night"
    },
    {
      "name": "mc/ui/time_6midnight",
      "path": "textures/ui/time_6midnight"
    },
    {
      "name": "mc/ui/tiny_agnes",
      "path": "textures/ui/tiny_agnes"
    },
    {
      "name": "mc/ui/tip_arrows_left",
      "path": "textures/ui/tip_arrows_left"
    },
    {
      "name": "mc/ui/tip_arrows_right",
      "path": "textures/ui/tip_arrows_right"
    },
    {
      "name": "mc/ui/tip_Chevron",
      "path": "textures/ui/tip_Chevron"
    },
    {
      "name": "mc/ui/tip_panel",
      "path": "textures/ui/tip_panel"
    },
    {
      "name": "mc/ui/title",
      "path": "textures/ui/title"
    },
    {
      "name": "mc/ui/tnt_animated",
      "path": "textures/ui/tnt_animated"
    },
    {
      "name": "mc/ui/toggle_off",
      "path": "textures/ui/toggle_off"
    },
    {
      "name": "mc/ui/toggle_off_hover",
      "path": "textures/ui/toggle_off_hover"
    },
    {
      "name": "mc/ui/toggle_on",
      "path": "textures/ui/toggle_on"
    },
    {
      "name": "mc/ui/toggle_on_hover",
      "path": "textures/ui/toggle_on_hover"
    },
    {
      "name": "mc/ui/toolbar_background",
      "path": "textures/ui/toolbar_background"
    },
    {
      "name": "mc/ui/tooltip_default_background",
      "path": "textures/ui/tooltip_default_background"
    },
    {
      "name": "mc/ui/tooltip_default_chevron",
      "path": "textures/ui/tooltip_default_chevron"
    },
    {
      "name": "mc/ui/tooltip_default_chevron_rotated",
      "path": "textures/ui/tooltip_default_chevron_rotated"
    },
    {
      "name": "mc/ui/tooltip_inverted_chevron",
      "path": "textures/ui/tooltip_inverted_chevron"
    },
    {
      "name": "mc/ui/tooltip_notification_default_background",
      "path": "textures/ui/tooltip_notification_default_background"
    },
    {
      "name": "mc/ui/topbar_off_left",
      "path": "textures/ui/topbar_off_left"
    },
    {
      "name": "mc/ui/topbar_off_middle",
      "path": "textures/ui/topbar_off_middle"
    },
    {
      "name": "mc/ui/topbar_off_point",
      "path": "textures/ui/topbar_off_point"
    },
    {
      "name": "mc/ui/topbar_off_right",
      "path": "textures/ui/topbar_off_right"
    },
    {
      "name": "mc/ui/topbar_on_left",
      "path": "textures/ui/topbar_on_left"
    },
    {
      "name": "mc/ui/topbar_on_middle",
      "path": "textures/ui/topbar_on_middle"
    },
    {
      "name": "mc/ui/topbar_on_point",
      "path": "textures/ui/topbar_on_point"
    },
    {
      "name": "mc/ui/topbar_on_right",
      "path": "textures/ui/topbar_on_right"
    },
    {
      "name": "mc/ui/touchScrollBox",
      "path": "textures/ui/touchScrollBox"
    },
    {
      "name": "mc/ui/touch_glyph",
      "path": "textures/ui/touch_glyph"
    },
    {
      "name": "mc/ui/touch_glyph_color",
      "path": "textures/ui/touch_glyph_color"
    },
    {
      "name": "mc/ui/trade_icon",
      "path": "textures/ui/trade_icon"
    },
    {
      "name": "mc/ui/trash",
      "path": "textures/ui/trash"
    },
    {
      "name": "mc/ui/trash_default",
      "path": "textures/ui/trash_default"
    },
    {
      "name": "mc/ui/trash_hover",
      "path": "textures/ui/trash_hover"
    },
    {
      "name": "mc/ui/trash_light",
      "path": "textures/ui/trash_light"
    },
    {
      "name": "mc/ui/trash_pressed",
      "path": "textures/ui/trash_pressed"
    },
    {
      "name": "mc/ui/trophy",
      "path": "textures/ui/trophy"
    },
    {
      "name": "mc/ui/ui_debug_glyph",
      "path": "textures/ui/ui_debug_glyph"
    },
    {
      "name": "mc/ui/ui_debug_glyph_color",
      "path": "textures/ui/ui_debug_glyph_color"
    },
    {
      "name": "mc/ui/underline",
      "path": "textures/ui/underline"
    },
    {
      "name": "mc/ui/underline_focus",
      "path": "textures/ui/underline_focus"
    },
    {
      "name": "mc/ui/undoArrow",
      "path": "textures/ui/undoArrow"
    },
    {
      "name": "mc/ui/unLock",
      "path": "textures/ui/unLock"
    },
    {
      "name": "mc/ui/unread_notifications_background",
      "path": "textures/ui/unread_notifications_background"
    },
    {
      "name": "mc/ui/unsynced_bevel",
      "path": "textures/ui/unsynced_bevel"
    },
    {
      "name": "mc/ui/unsynced_bevel_hover",
      "path": "textures/ui/unsynced_bevel_hover"
    },
    {
      "name": "mc/ui/unsynced_bevel_pressed",
      "path": "textures/ui/unsynced_bevel_pressed"
    },
    {
      "name": "mc/ui/unsynced_bg_hover",
      "path": "textures/ui/unsynced_bg_hover"
    },
    {
      "name": "mc/ui/update",
      "path": "textures/ui/update"
    },
    {
      "name": "mc/ui/UpdateGlyph",
      "path": "textures/ui/UpdateGlyph"
    },
    {
      "name": "mc/ui/UpdateGlyph_small",
      "path": "textures/ui/UpdateGlyph_small"
    },
    {
      "name": "mc/ui/update_bevel",
      "path": "textures/ui/update_bevel"
    },
    {
      "name": "mc/ui/update_bevel_hover",
      "path": "textures/ui/update_bevel_hover"
    },
    {
      "name": "mc/ui/update_bevel_pressed",
      "path": "textures/ui/update_bevel_pressed"
    },
    {
      "name": "mc/ui/update_world_chunks",
      "path": "textures/ui/update_world_chunks"
    },
    {
      "name": "mc/ui/upload_glyph",
      "path": "textures/ui/upload_glyph"
    },
    {
      "name": "mc/ui/up_arrow",
      "path": "textures/ui/up_arrow"
    },
    {
      "name": "mc/ui/up_chevron",
      "path": "textures/ui/up_chevron"
    },
    {
      "name": "mc/ui/user_icon",
      "path": "textures/ui/user_icon"
    },
    {
      "name": "mc/ui/user_icon_small",
      "path": "textures/ui/user_icon_small"
    },
    {
      "name": "mc/ui/user_icon_white",
      "path": "textures/ui/user_icon_white"
    },
    {
      "name": "mc/ui/verticalgradient",
      "path": "textures/ui/verticalgradient"
    },
    {
      "name": "mc/ui/vertical_divider",
      "path": "textures/ui/vertical_divider"
    },
    {
      "name": "mc/ui/video_glyph",
      "path": "textures/ui/video_glyph"
    },
    {
      "name": "mc/ui/video_glyph_2x",
      "path": "textures/ui/video_glyph_2x"
    },
    {
      "name": "mc/ui/video_glyph_color",
      "path": "textures/ui/video_glyph_color"
    },
    {
      "name": "mc/ui/video_glyph_color_2x",
      "path": "textures/ui/video_glyph_color_2x"
    },
    {
      "name": "mc/ui/village_hero_effect",
      "path": "textures/ui/village_hero_effect"
    },
    {
      "name": "mc/ui/vr_glyph",
      "path": "textures/ui/vr_glyph"
    },
    {
      "name": "mc/ui/vr_glyph_color",
      "path": "textures/ui/vr_glyph_color"
    },
    {
      "name": "mc/ui/WarningGlyph",
      "path": "textures/ui/WarningGlyph"
    },
    {
      "name": "mc/ui/WarningGlyph_small",
      "path": "textures/ui/WarningGlyph_small"
    },
    {
      "name": "mc/ui/WarningGlyph_small_hover",
      "path": "textures/ui/WarningGlyph_small_hover"
    },
    {
      "name": "mc/ui/warning_alex",
      "path": "textures/ui/warning_alex"
    },
    {
      "name": "mc/ui/warning_sad_steve",
      "path": "textures/ui/warning_sad_steve"
    },
    {
      "name": "mc/ui/waterascend",
      "path": "textures/ui/waterascend"
    },
    {
      "name": "mc/ui/waterascend_pressed",
      "path": "textures/ui/waterascend_pressed"
    },
    {
      "name": "mc/ui/waterdescend",
      "path": "textures/ui/waterdescend"
    },
    {
      "name": "mc/ui/waterdescend_pressed",
      "path": "textures/ui/waterdescend_pressed"
    },
    {
      "name": "mc/ui/water_breathing_effect",
      "path": "textures/ui/water_breathing_effect"
    },
    {
      "name": "mc/ui/weakness_effect",
      "path": "textures/ui/weakness_effect"
    },
    {
      "name": "mc/ui/weather_clear",
      "path": "textures/ui/weather_clear"
    },
    {
      "name": "mc/ui/weather_rain",
      "path": "textures/ui/weather_rain"
    },
    {
      "name": "mc/ui/weather_thunderstorm",
      "path": "textures/ui/weather_thunderstorm"
    },
    {
      "name": "mc/ui/white",
      "path": "textures/ui/white"
    },
    {
      "name": "mc/ui/whiteArrow",
      "path": "textures/ui/whiteArrow"
    },
    {
      "name": "mc/ui/whiteArrow2",
      "path": "textures/ui/whiteArrow2"
    },
    {
      "name": "mc/ui/whiteline",
      "path": "textures/ui/whiteline"
    },
    {
      "name": "mc/ui/white_background",
      "path": "textures/ui/white_background"
    },
    {
      "name": "mc/ui/white_highlight_slot",
      "path": "textures/ui/white_highlight_slot"
    },
    {
      "name": "mc/ui/white_pixel_chevron_down",
      "path": "textures/ui/white_pixel_chevron_down"
    },
    {
      "name": "mc/ui/white_pixel_chevron_right",
      "path": "textures/ui/white_pixel_chevron_right"
    },
    {
      "name": "mc/ui/Wishlist_PDP_UI",
      "path": "textures/ui/Wishlist_PDP_UI"
    },
    {
      "name": "mc/ui/wither_effect",
      "path": "textures/ui/wither_effect"
    },
    {
      "name": "mc/ui/wither_heart",
      "path": "textures/ui/wither_heart"
    },
    {
      "name": "mc/ui/wither_heart_flash",
      "path": "textures/ui/wither_heart_flash"
    },
    {
      "name": "mc/ui/wither_heart_flash_half",
      "path": "textures/ui/wither_heart_flash_half"
    },
    {
      "name": "mc/ui/wither_heart_half",
      "path": "textures/ui/wither_heart_half"
    },
    {
      "name": "mc/ui/world-preview-flat-fixed-pixels",
      "path": "textures/ui/world-preview-flat-fixed-pixels"
    },
    {
      "name": "mc/ui/World",
      "path": "textures/ui/World"
    },
    {
      "name": "mc/ui/WorldDemoScreen",
      "path": "textures/ui/WorldDemoScreen"
    },
    {
      "name": "mc/ui/WorldDemoScreen_Big",
      "path": "textures/ui/WorldDemoScreen_Big"
    },
    {
      "name": "mc/ui/WorldDemoScreen_Big_Grayscale",
      "path": "textures/ui/WorldDemoScreen_Big_Grayscale"
    },
    {
      "name": "mc/ui/worldsIcon",
      "path": "textures/ui/worldsIcon"
    },
    {
      "name": "mc/ui/world_glyph",
      "path": "textures/ui/world_glyph"
    },
    {
      "name": "mc/ui/world_glyph_color",
      "path": "textures/ui/world_glyph_color"
    },
    {
      "name": "mc/ui/world_glyph_color_2x",
      "path": "textures/ui/world_glyph_color_2x"
    },
    {
      "name": "mc/ui/world_glyph_color_2x_black_outline",
      "path": "textures/ui/world_glyph_color_2x_black_outline"
    },
    {
      "name": "mc/ui/world_glyph_desaturated",
      "path": "textures/ui/world_glyph_desaturated"
    },
    {
      "name": "mc/ui/world_screenshot_focus_border",
      "path": "textures/ui/world_screenshot_focus_border"
    },
    {
      "name": "mc/ui/world_upgrade",
      "path": "textures/ui/world_upgrade"
    },
    {
      "name": "mc/ui/Wrenches1",
      "path": "textures/ui/Wrenches1"
    },
    {
      "name": "mc/ui/xbox4",
      "path": "textures/ui/xbox4"
    },
    {
      "name": "mc/ui/xboxconversionkeyart",
      "path": "textures/ui/xboxconversionkeyart"
    },
    {
      "name": "mc/ui/xbox_bumper_left",
      "path": "textures/ui/xbox_bumper_left"
    },
    {
      "name": "mc/ui/xbox_bumper_right",
      "path": "textures/ui/xbox_bumper_right"
    },
    {
      "name": "mc/ui/xbox_dpad",
      "path": "textures/ui/xbox_dpad"
    },
    {
      "name": "mc/ui/xbox_dpad_down",
      "path": "textures/ui/xbox_dpad_down"
    },
    {
      "name": "mc/ui/xbox_dpad_left",
      "path": "textures/ui/xbox_dpad_left"
    },
    {
      "name": "mc/ui/xbox_dpad_right",
      "path": "textures/ui/xbox_dpad_right"
    },
    {
      "name": "mc/ui/xbox_dpad_up",
      "path": "textures/ui/xbox_dpad_up"
    },
    {
      "name": "mc/ui/xbox_face_button_down",
      "path": "textures/ui/xbox_face_button_down"
    },
    {
      "name": "mc/ui/xbox_face_button_left",
      "path": "textures/ui/xbox_face_button_left"
    },
    {
      "name": "mc/ui/xbox_face_button_right",
      "path": "textures/ui/xbox_face_button_right"
    },
    {
      "name": "mc/ui/xbox_face_button_up",
      "path": "textures/ui/xbox_face_button_up"
    },
    {
      "name": "mc/ui/xbox_left_trigger",
      "path": "textures/ui/xbox_left_trigger"
    },
    {
      "name": "mc/ui/xbox_right_trigger",
      "path": "textures/ui/xbox_right_trigger"
    },
    {
      "name": "mc/ui/xbox_select_button",
      "path": "textures/ui/xbox_select_button"
    },
    {
      "name": "mc/ui/xbox_start_button",
      "path": "textures/ui/xbox_start_button"
    },
    {
      "name": "mc/ui/xbox_stick_left",
      "path": "textures/ui/xbox_stick_left"
    },
    {
      "name": "mc/ui/xbox_stick_right",
      "path": "textures/ui/xbox_stick_right"
    },
    {
      "name": "mc/ui/xbox_touchpad",
      "path": "textures/ui/xbox_touchpad"
    },
    {
      "name": "mc/ui/XTab",
      "path": "textures/ui/XTab"
    },
    {
      "name": "mc/ui/xyz_axis",
      "path": "textures/ui/xyz_axis"
    },
    {
      "name": "mc/ui/x_default",
      "path": "textures/ui/x_default"
    },
    {
      "name": "mc/ui/x_dropdown_default",
      "path": "textures/ui/x_dropdown_default"
    },
    {
      "name": "mc/ui/x_dropdown_hover",
      "path": "textures/ui/x_dropdown_hover"
    },
    {
      "name": "mc/ui/x_hover",
      "path": "textures/ui/x_hover"
    },
    {
      "name": "mc/ui/x_pressed",
      "path": "textures/ui/x_pressed"
    },
    {
      "name": "mc/ui/yellowExclamation",
      "path": "textures/ui/yellowExclamation"
    },
    {
      "name": "mc/ui/yellow_banner",
      "path": "textures/ui/yellow_banner"
    },
    {
      "name": "mc/sidebar_icons/blueheart",
      "path": "textures/ui/sidebar_icons/blueheart"
    },
    {
      "name": "mc/sidebar_icons/bookmark",
      "path": "textures/ui/sidebar_icons/bookmark"
    },
    {
      "name": "mc/sidebar_icons/button_panel",
      "path": "textures/ui/sidebar_icons/button_panel"
    },
    {
      "name": "mc/sidebar_icons/capes",
      "path": "textures/ui/sidebar_icons/capes"
    },
    {
      "name": "mc/sidebar_icons/categories",
      "path": "textures/ui/sidebar_icons/categories"
    },
    {
      "name": "mc/sidebar_icons/character_creator",
      "path": "textures/ui/sidebar_icons/character_creator"
    },
    {
      "name": "mc/sidebar_icons/classic_skins",
      "path": "textures/ui/sidebar_icons/classic_skins"
    },
    {
      "name": "mc/sidebar_icons/dressing_room_animation",
      "path": "textures/ui/sidebar_icons/dressing_room_animation"
    },
    {
      "name": "mc/sidebar_icons/dressing_room_capes",
      "path": "textures/ui/sidebar_icons/dressing_room_capes"
    },
    {
      "name": "mc/sidebar_icons/dressing_room_customization",
      "path": "textures/ui/sidebar_icons/dressing_room_customization"
    },
    {
      "name": "mc/sidebar_icons/dressing_room_skins",
      "path": "textures/ui/sidebar_icons/dressing_room_skins"
    },
    {
      "name": "mc/sidebar_icons/dr_body",
      "path": "textures/ui/sidebar_icons/dr_body"
    },
    {
      "name": "mc/sidebar_icons/dr_style",
      "path": "textures/ui/sidebar_icons/dr_style"
    },
    {
      "name": "mc/sidebar_icons/emotes",
      "path": "textures/ui/sidebar_icons/emotes"
    },
    {
      "name": "mc/sidebar_icons/featured",
      "path": "textures/ui/sidebar_icons/featured"
    },
    {
      "name": "mc/sidebar_icons/genre",
      "path": "textures/ui/sidebar_icons/genre"
    },
    {
      "name": "mc/sidebar_icons/marketplace",
      "path": "textures/ui/sidebar_icons/marketplace"
    },
    {
      "name": "mc/sidebar_icons/menu_threebars",
      "path": "textures/ui/sidebar_icons/menu_threebars"
    },
    {
      "name": "mc/sidebar_icons/my_characters",
      "path": "textures/ui/sidebar_icons/my_characters"
    },
    {
      "name": "mc/sidebar_icons/my_content",
      "path": "textures/ui/sidebar_icons/my_content"
    },
    {
      "name": "mc/sidebar_icons/owned_skins_icon",
      "path": "textures/ui/sidebar_icons/owned_skins_icon"
    },
    {
      "name": "mc/sidebar_icons/profile_screen_icon",
      "path": "textures/ui/sidebar_icons/profile_screen_icon"
    },
    {
      "name": "mc/sidebar_icons/promotag",
      "path": "textures/ui/sidebar_icons/promotag"
    },
    {
      "name": "mc/sidebar_icons/realms",
      "path": "textures/ui/sidebar_icons/realms"
    },
    {
      "name": "mc/sidebar_icons/realms_plus_skins_icon",
      "path": "textures/ui/sidebar_icons/realms_plus_skins_icon"
    },
    {
      "name": "mc/sidebar_icons/redheart",
      "path": "textures/ui/sidebar_icons/redheart"
    },
    {
      "name": "mc/sidebar_icons/rounddonut",
      "path": "textures/ui/sidebar_icons/rounddonut"
    },
    {
      "name": "mc/sidebar_icons/side_drawer_button_hover_focused",
      "path": "textures/ui/sidebar_icons/side_drawer_button_hover_focused"
    },
    {
      "name": "mc/sidebar_icons/side_drawer_button_selected",
      "path": "textures/ui/sidebar_icons/side_drawer_button_selected"
    },
    {
      "name": "mc/sidebar_icons/side_drawer_left_panel",
      "path": "textures/ui/sidebar_icons/side_drawer_left_panel"
    },
    {
      "name": "mc/sidebar_icons/side_panel_button_hover_focused",
      "path": "textures/ui/sidebar_icons/side_panel_button_hover_focused"
    },
    {
      "name": "mc/sidebar_icons/side_panel_button_selected",
      "path": "textures/ui/sidebar_icons/side_panel_button_selected"
    },
    {
      "name": "mc/sidebar_icons/side_panel_divider",
      "path": "textures/ui/sidebar_icons/side_panel_divider"
    },
    {
      "name": "mc/sidebar_icons/squaredonut",
      "path": "textures/ui/sidebar_icons/squaredonut"
    },
    {
      "name": "mc/sidebar_icons/star",
      "path": "textures/ui/sidebar_icons/star"
    },
    {
      "name": "mc/sidebar_icons/unowned_skins_icon",
      "path": "textures/ui/sidebar_icons/unowned_skins_icon"
    },
    {
      "name": "mc/sidebar_icons/wish_list",
      "path": "textures/ui/sidebar_icons/wish_list"
    }
]
let filteredList = iconsList.filter(_=>{
    return (_.name.startsWith('mc/blocks/glass') && !_.name.includes('pane')) || _.name == "mc/blocks/tinted_glass";
}).map(_=>{
    return {
        name: _.name == "mc/blocks/glass" ? `basic_glass` : _.name == "mc/blocks/tinted_glass" ? "tinted_glass" : `${_.name.substring('mc/blocks/glass_'.length)}_glass`,
        path: _.path
    }
})
filteredList.push(...iconsList);
for(const icon of filteredList) {
  icons.set(icon.name, icon);
}