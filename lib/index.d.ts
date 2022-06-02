/// <reference types="mapbox__point-geometry" />
import * as Maplibre from "maplibre-gl";
import { GridControl, CellPrecision } from "./controls";
import UnlMap from "./map/UnlMap";
declare const exported: {
    Map: typeof UnlMap;
    GridControl: typeof GridControl;
    GridControlOptions: typeof GridControl;
    CellPrecision: typeof CellPrecision;
    AJAXError: typeof Maplibre.AJAXError;
    RequestManager: typeof Maplibre.RequestManager;
    Event: typeof Maplibre.Event;
    Evented: typeof Maplibre.Evented;
    Color: typeof Maplibre.Color;
    ZoomHistory: typeof Maplibre.ZoomHistory;
    EvaluationParameters: typeof Maplibre.EvaluationParameters;
    LngLatBounds: typeof Maplibre.LngLatBounds;
    LngLat: typeof Maplibre.LngLat;
    MercatorCoordinate: typeof Maplibre.MercatorCoordinate;
    CanonicalTileID: typeof Maplibre.CanonicalTileID;
    UnwrappedTileID: typeof Maplibre.UnwrappedTileID;
    OverscaledTileID: typeof Maplibre.OverscaledTileID;
    Intl$Collator: typeof Maplibre.Intl$Collator;
    Collator: typeof Maplibre.Collator;
    ResolvedImage: typeof Maplibre.ResolvedImage;
    FormattedSection: typeof Maplibre.FormattedSection;
    Formatted: typeof Maplibre.Formatted;
    PropertyValue: typeof Maplibre.PropertyValue;
    TransitionablePropertyValue: typeof Maplibre.TransitionablePropertyValue;
    Transitionable: typeof Maplibre.Transitionable;
    TransitioningPropertyValue: typeof Maplibre.TransitioningPropertyValue;
    Transitioning: typeof Maplibre.Transitioning;
    Layout: typeof Maplibre.Layout;
    PossiblyEvaluatedPropertyValue: typeof Maplibre.PossiblyEvaluatedPropertyValue;
    PossiblyEvaluated: typeof Maplibre.PossiblyEvaluated;
    DataConstantProperty: typeof Maplibre.DataConstantProperty;
    DataDrivenProperty: typeof Maplibre.DataDrivenProperty;
    CrossFadedDataDrivenProperty: typeof Maplibre.CrossFadedDataDrivenProperty;
    CrossFadedProperty: typeof Maplibre.CrossFadedProperty;
    ColorRampProperty: typeof Maplibre.ColorRampProperty;
    Properties: typeof Maplibre.Properties;
    Struct: typeof Maplibre.Struct;
    StructArrayLayout2i4: typeof Maplibre.StructArrayLayout2i4;
    StructArrayLayout4i8: typeof Maplibre.StructArrayLayout4i8;
    StructArrayLayout2i4i12: typeof Maplibre.StructArrayLayout2i4i12;
    StructArrayLayout2i4ub8: typeof Maplibre.StructArrayLayout2i4ub8;
    StructArrayLayout2f8: typeof Maplibre.StructArrayLayout2f8;
    StructArrayLayout4i4ui4i24: typeof Maplibre.StructArrayLayout4i4ui4i24;
    StructArrayLayout3f12: typeof Maplibre.StructArrayLayout3f12;
    StructArrayLayout1ul4: typeof Maplibre.StructArrayLayout1ul4;
    StructArrayLayout6i1ul2ui20: typeof Maplibre.StructArrayLayout6i1ul2ui20;
    StructArrayLayout2ub2f12: typeof Maplibre.StructArrayLayout2ub2f12;
    StructArrayLayout3ui6: typeof Maplibre.StructArrayLayout3ui6;
    StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48: typeof Maplibre.StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48;
    StructArrayLayout8i15ui1ul4f68: typeof Maplibre.StructArrayLayout8i15ui1ul4f68;
    StructArrayLayout1f4: typeof Maplibre.StructArrayLayout1f4;
    StructArrayLayout3i6: typeof Maplibre.StructArrayLayout3i6;
    StructArrayLayout1ul2ui8: typeof Maplibre.StructArrayLayout1ul2ui8;
    StructArrayLayout2ui4: typeof Maplibre.StructArrayLayout2ui4;
    StructArrayLayout1ui2: typeof Maplibre.StructArrayLayout1ui2;
    CollisionBoxStruct: typeof Maplibre.CollisionBoxStruct;
    CollisionBoxArray: typeof Maplibre.CollisionBoxArray;
    PlacedSymbolStruct: typeof Maplibre.PlacedSymbolStruct;
    PlacedSymbolArray: typeof Maplibre.PlacedSymbolArray;
    SymbolInstanceStruct: typeof Maplibre.SymbolInstanceStruct;
    SymbolInstanceArray: typeof Maplibre.SymbolInstanceArray;
    GlyphOffsetArray: typeof Maplibre.GlyphOffsetArray;
    SymbolLineVertexArray: typeof Maplibre.SymbolLineVertexArray;
    FeatureIndexStruct: typeof Maplibre.FeatureIndexStruct;
    FeatureIndexArray: typeof Maplibre.FeatureIndexArray;
    RasterBoundsArray: typeof Maplibre.RasterBoundsArray;
    CircleLayoutArray: typeof Maplibre.CircleLayoutArray;
    FillLayoutArray: typeof Maplibre.FillLayoutArray;
    FillExtrusionLayoutArray: typeof Maplibre.FillExtrusionLayoutArray;
    LineLayoutArray: typeof Maplibre.LineLayoutArray;
    LineExtLayoutArray: typeof Maplibre.LineExtLayoutArray;
    SymbolLayoutArray: typeof Maplibre.SymbolLayoutArray;
    SymbolDynamicLayoutArray: typeof Maplibre.SymbolDynamicLayoutArray;
    SymbolOpacityArray: typeof Maplibre.SymbolOpacityArray;
    CollisionVertexArray: typeof Maplibre.CollisionVertexArray;
    TriangleIndexArray: typeof Maplibre.TriangleIndexArray;
    LineIndexArray: typeof Maplibre.LineIndexArray;
    LineStripIndexArray: typeof Maplibre.LineStripIndexArray;
    FeaturePositionMap: typeof Maplibre.FeaturePositionMap;
    IndexBuffer: typeof Maplibre.IndexBuffer;
    VertexBuffer: typeof Maplibre.VertexBuffer;
    BaseValue: typeof Maplibre.BaseValue;
    ClearColor: typeof Maplibre.ClearColor;
    ClearDepth: typeof Maplibre.ClearDepth;
    ClearStencil: typeof Maplibre.ClearStencil;
    ColorMask: typeof Maplibre.ColorMask;
    DepthMask: typeof Maplibre.DepthMask;
    StencilMask: typeof Maplibre.StencilMask;
    StencilFunc: typeof Maplibre.StencilFunc;
    StencilOp: typeof Maplibre.StencilOp;
    StencilTest: typeof Maplibre.StencilTest;
    DepthRange: typeof Maplibre.DepthRange;
    DepthTest: typeof Maplibre.DepthTest;
    DepthFunc: typeof Maplibre.DepthFunc;
    Blend: typeof Maplibre.Blend;
    BlendFunc: typeof Maplibre.BlendFunc;
    BlendColor: typeof Maplibre.BlendColor;
    BlendEquation: typeof Maplibre.BlendEquation;
    CullFace: typeof Maplibre.CullFace;
    CullFaceSide: typeof Maplibre.CullFaceSide;
    FrontFace: typeof Maplibre.FrontFace;
    ProgramValue: typeof Maplibre.ProgramValue;
    ActiveTextureUnit: typeof Maplibre.ActiveTextureUnit;
    Viewport: typeof Maplibre.Viewport;
    BindFramebuffer: typeof Maplibre.BindFramebuffer;
    BindRenderbuffer: typeof Maplibre.BindRenderbuffer;
    BindTexture: typeof Maplibre.BindTexture;
    BindVertexBuffer: typeof Maplibre.BindVertexBuffer;
    BindElementBuffer: typeof Maplibre.BindElementBuffer;
    BindVertexArrayOES: typeof Maplibre.BindVertexArrayOES;
    PixelStoreUnpack: typeof Maplibre.PixelStoreUnpack;
    PixelStoreUnpackPremultiplyAlpha: typeof Maplibre.PixelStoreUnpackPremultiplyAlpha;
    PixelStoreUnpackFlipY: typeof Maplibre.PixelStoreUnpackFlipY;
    FramebufferAttachment: typeof Maplibre.FramebufferAttachment;
    ColorAttachment: typeof Maplibre.ColorAttachment;
    DepthAttachment: typeof Maplibre.DepthAttachment;
    Framebuffer: typeof Maplibre.Framebuffer;
    DepthMode: typeof Maplibre.DepthMode;
    StencilMode: typeof Maplibre.StencilMode;
    ColorMode: typeof Maplibre.ColorMode;
    CullFaceMode: typeof Maplibre.CullFaceMode;
    Context: typeof Maplibre.Context;
    AlphaImage: typeof Maplibre.AlphaImage;
    RGBAImage: typeof Maplibre.RGBAImage;
    Texture: typeof Maplibre.Texture;
    ImageManager: typeof Maplibre.ImageManager;
    ImagePosition: typeof Maplibre.ImagePosition;
    ImageAtlas: typeof Maplibre.ImageAtlas;
    TransferableGridIndex: typeof Maplibre.TransferableGridIndex;
    DictionaryCoder: typeof Maplibre.DictionaryCoder;
    GeoJSONFeature: typeof Maplibre.GeoJSONFeature;
    EdgeInsets: typeof Maplibre.EdgeInsets;
    Transform: typeof Maplibre.Transform;
    FeatureIndex: typeof Maplibre.FeatureIndex;
    DEMData: typeof Maplibre.DEMData;
    ThrottledInvoker: typeof Maplibre.ThrottledInvoker;
    Actor: typeof Maplibre.Actor;
    Tile: typeof Maplibre.Tile;
    SourceFeatureState: typeof Maplibre.SourceFeatureState;
    ProgramConfiguration: typeof Maplibre.ProgramConfiguration;
    ProgramConfigurationSet: typeof Maplibre.ProgramConfigurationSet;
    Program: typeof Maplibre.Program;
    VertexArrayObject: typeof Maplibre.VertexArrayObject;
    SegmentVector: typeof Maplibre.SegmentVector;
    HeatmapBucket: typeof Maplibre.HeatmapBucket;
    HeatmapStyleLayer: typeof Maplibre.HeatmapStyleLayer;
    CircleBucket: typeof Maplibre.CircleBucket;
    CircleStyleLayer: typeof Maplibre.CircleStyleLayer;
    FillBucket: typeof Maplibre.FillBucket;
    FillStyleLayer: typeof Maplibre.FillStyleLayer;
    FillExtrusionBucket: typeof Maplibre.FillExtrusionBucket;
    FillExtrusionStyleLayer: typeof Maplibre.FillExtrusionStyleLayer;
    HillshadeStyleLayer: typeof Maplibre.HillshadeStyleLayer;
    LineBucket: typeof Maplibre.LineBucket;
    LineStyleLayer: typeof Maplibre.LineStyleLayer;
    Anchor: typeof Maplibre.Anchor;
    SymbolBuffers: typeof Maplibre.SymbolBuffers;
    CollisionBuffers: typeof Maplibre.CollisionBuffers;
    SymbolBucket: typeof Maplibre.SymbolBucket;
    SymbolStyleLayer: typeof Maplibre.SymbolStyleLayer;
    GlyphManager: typeof Maplibre.GlyphManager;
    LightPositionProperty: typeof Maplibre.LightPositionProperty;
    Light: typeof Maplibre.Light;
    LineAtlas: typeof Maplibre.LineAtlas;
    WorkerPool: typeof Maplibre.WorkerPool;
    Dispatcher: typeof Maplibre.Dispatcher;
    TileBounds: typeof Maplibre.TileBounds;
    VectorTileSource: typeof Maplibre.VectorTileSource;
    RasterTileSource: typeof Maplibre.RasterTileSource;
    MapMouseEvent: typeof Maplibre.MapMouseEvent;
    MapTouchEvent: typeof Maplibre.MapTouchEvent;
    MapWheelEvent: typeof Maplibre.MapWheelEvent;
    GeoJSONSource: typeof Maplibre.GeoJSONSource;
    CanvasSource: typeof Maplibre.CanvasSource;
    ImageSource: typeof Maplibre.ImageSource;
    TileCache: typeof Maplibre.TileCache;
    SourceCache: typeof Maplibre.SourceCache;
    GridIndex: typeof Maplibre.GridIndex;
    CollisionIndex: typeof Maplibre.CollisionIndex;
    OpacityState: typeof Maplibre.OpacityState;
    JointOpacityState: typeof Maplibre.JointOpacityState;
    JointPlacement: typeof Maplibre.JointPlacement;
    CollisionCircleArray: typeof Maplibre.CollisionCircleArray;
    RetainedQueryData: typeof Maplibre.RetainedQueryData;
    CollisionGroups: typeof Maplibre.CollisionGroups;
    Placement: typeof Maplibre.Placement;
    LayerPlacement: typeof Maplibre.LayerPlacement;
    PauseablePlacement: typeof Maplibre.PauseablePlacement;
    TileLayerIndex: typeof Maplibre.TileLayerIndex;
    CrossTileIDs: typeof Maplibre.CrossTileIDs;
    CrossTileSymbolLayerIndex: typeof Maplibre.CrossTileSymbolLayerIndex;
    CrossTileSymbolIndex: typeof Maplibre.CrossTileSymbolIndex;
    Style: typeof Maplibre.Style;
    Painter: typeof Maplibre.Painter;
    Hash: typeof Maplibre.Hash;
    MouseHandler: typeof Maplibre.MouseHandler;
    MousePanHandler: typeof Maplibre.MousePanHandler;
    MouseRotateHandler: typeof Maplibre.MouseRotateHandler;
    MousePitchHandler: typeof Maplibre.MousePitchHandler;
    TouchPanHandler: typeof Maplibre.TouchPanHandler;
    DragPanHandler: typeof Maplibre.DragPanHandler;
    HandlerInertia: typeof Maplibre.HandlerInertia;
    RenderFrameEvent: typeof Maplibre.RenderFrameEvent;
    HandlerManager: typeof Maplibre.HandlerManager;
    TaskQueue: typeof Maplibre.TaskQueue;
    ScrollZoomHandler: typeof Maplibre.ScrollZoomHandler;
    BoxZoomHandler: typeof Maplibre.BoxZoomHandler;
    TwoTouchHandler: typeof Maplibre.TwoTouchHandler;
    TouchZoomHandler: typeof Maplibre.TouchZoomHandler;
    TouchRotateHandler: typeof Maplibre.TouchRotateHandler;
    TouchPitchHandler: typeof Maplibre.TouchPitchHandler;
    DragRotateHandler: typeof Maplibre.DragRotateHandler;
    KeyboardHandler: typeof Maplibre.KeyboardHandler;
    ClickZoomHandler: typeof Maplibre.ClickZoomHandler;
    SingleTapRecognizer: typeof Maplibre.SingleTapRecognizer;
    TapRecognizer: typeof Maplibre.TapRecognizer;
    TapZoomHandler: typeof Maplibre.TapZoomHandler;
    DoubleClickZoomHandler: typeof Maplibre.DoubleClickZoomHandler;
    TapDragZoomHandler: typeof Maplibre.TapDragZoomHandler;
    TouchZoomRotateHandler: typeof Maplibre.TouchZoomRotateHandler;
    NavigationControl: typeof Maplibre.NavigationControl;
    MouseRotateWrapper: typeof Maplibre.MouseRotateWrapper;
    Popup: typeof Maplibre.Popup;
    Marker: typeof Maplibre.Marker;
    GeolocateControl: typeof Maplibre.GeolocateControl;
    AttributionControl: typeof Maplibre.AttributionControl;
    LogoControl: typeof Maplibre.LogoControl;
    ScaleControl: typeof Maplibre.ScaleControl;
    FullscreenControl: typeof Maplibre.FullscreenControl;
    RasterDEMTileSource: typeof Maplibre.RasterDEMTileSource;
    VideoSource: typeof Maplibre.VideoSource;
    default: {
        supported: import("@mapbox/mapbox-gl-supported").IsSupported;
        setRTLTextPlugin: (url: string, callback: (error?: Error | undefined) => void, deferred?: boolean | undefined) => void;
        getRTLTextPluginStatus: () => string;
        Map: typeof Maplibre.Map;
        NavigationControl: typeof Maplibre.NavigationControl;
        GeolocateControl: typeof Maplibre.GeolocateControl;
        AttributionControl: typeof Maplibre.AttributionControl;
        LogoControl: typeof Maplibre.LogoControl;
        ScaleControl: typeof Maplibre.ScaleControl;
        FullscreenControl: typeof Maplibre.FullscreenControl;
        Popup: typeof Maplibre.Popup;
        Marker: typeof Maplibre.Marker;
        Style: typeof Maplibre.Style;
        LngLat: typeof Maplibre.LngLat;
        LngLatBounds: typeof Maplibre.LngLatBounds;
        Point: typeof import("@mapbox/point-geometry");
        MercatorCoordinate: typeof Maplibre.MercatorCoordinate;
        Evented: typeof Maplibre.Evented;
        AJAXError: typeof Maplibre.AJAXError;
        config: {
            MAX_PARALLEL_IMAGE_REQUESTS: number;
            REGISTERED_PROTOCOLS: {
                [x: string]: any;
            };
        };
        CanvasSource: typeof Maplibre.CanvasSource;
        GeoJSONSource: typeof Maplibre.GeoJSONSource;
        ImageSource: typeof Maplibre.ImageSource;
        RasterDEMTileSource: typeof Maplibre.RasterDEMTileSource;
        RasterTileSource: typeof Maplibre.RasterTileSource;
        VectorTileSource: typeof Maplibre.VectorTileSource;
        VideoSource: typeof Maplibre.VideoSource;
        prewarm: () => void;
        clearPrewarmedResources: () => void;
        workerCount: number;
        maxParallelImageRequests: number;
        clearStorage(callback?: ((err?: Error | null | undefined) => void) | undefined): void;
        workerUrl: string;
        addProtocol(customProtocol: string, loadFn: (requestParameters: Maplibre.RequestParameters, callback: Maplibre.ResponseCallback<any>) => Maplibre.Cancelable): void;
        removeProtocol(customProtocol: string): void;
    };
};
export default exported;
