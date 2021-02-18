import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SweepDirection } from "igniteui-angular-core";
import { IgxRadialGaugeComponent } from "igniteui-angular-gauges";
import { IgxRadialGaugeRangeComponent } from "igniteui-angular-gauges";
import { RadialGaugeBackingShape } from "igniteui-angular-gauges";
import { RadialGaugeNeedleShape } from "igniteui-angular-gauges";
import { RadialGaugePivotShape } from "igniteui-angular-gauges";
import { RadialGaugeScaleOversweepShape } from "igniteui-angular-gauges";

@Component({
  selector: 'app-guage',
  templateUrl: './guage.component.html',
  styleUrls: ['./guage.component.css']
})
export class GuageComponent implements AfterViewInit {
  @ViewChild("radialGauge", { static: true })
  public radialGauge: IgxRadialGaugeComponent;
  _reading: number;

  @Input() label: string;

  @Input() set reading(value: number) {
    this._reading = value;
    this.AnimateToGauge();
  }
  get reding(): number {
    return this._reading;
  }

  public ngAfterViewInit(): void {

    // enabling animation duration (in milliseconds)
    this.radialGauge.transitionDuration = 500;
    this.AnimateToGauge();
  }

  public AnimateToGauge(): void {

    this.radialGauge.height = "200px";
    this.radialGauge.width = "100%";

    this.radialGauge.minimumValue = 30;
    this.radialGauge.maximumValue = 100;
    this.radialGauge.value = this.reding;            // current reading
    //this.radialGauge.value = 77;            // current reading
    this.radialGauge.interval = 5;

    // setting appearance of labels
    this.radialGauge.labelInterval = 5;
    this.radialGauge.labelExtent = 0.71;
    this.radialGauge.font = "10px Verdana,Arial";

    // setting custom needle
    this.radialGauge.isNeedleDraggingEnabled = true;
    this.radialGauge.needleEndExtent = 0.5;
    this.radialGauge.needleShape = RadialGaugeNeedleShape.Triangle;
    this.radialGauge.needleEndWidthRatio = 0.03;
    this.radialGauge.needleStartWidthRatio = 0.05;
    this.radialGauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
    this.radialGauge.needlePivotWidthRatio = 0.15;
    this.radialGauge.needleBaseFeatureWidthRatio = 0.15;
    this.radialGauge.needleBrush = "#79797a";
    this.radialGauge.needleOutline = "#79797a";
    this.radialGauge.needlePivotBrush = "#79797a";
    this.radialGauge.needlePivotOutline = "#79797a";

    // setting appearance of major/minor ticks
    this.radialGauge.minorTickCount = 4;
    this.radialGauge.minorTickEndExtent = 0.625;
    this.radialGauge.minorTickStartExtent = 0.6;
    this.radialGauge.minorTickStrokeThickness = 1;
    this.radialGauge.minorTickBrush = "#79797a";
    this.radialGauge.tickStartExtent = 0.6;
    this.radialGauge.tickEndExtent = 0.65;
    this.radialGauge.tickStrokeThickness = 2;
    this.radialGauge.tickBrush = "#79797a";

    // setting extent of gauge scale
    this.radialGauge.scaleStartAngle = 120;
    this.radialGauge.scaleEndAngle = 60;
    this.radialGauge.scaleBrush = "#d6d6d6";
    this.radialGauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Fitted;
    this.radialGauge.scaleSweepDirection = SweepDirection.Clockwise;
    this.radialGauge.scaleEndExtent = 0.57;
    this.radialGauge.scaleStartExtent = 0.5;

    // setting appearance of backing dial
    this.radialGauge.backingBrush = "#fcfcfc";
    this.radialGauge.backingOutline = "#d6d6d6";
    this.radialGauge.backingStrokeThickness = 5;
    this.radialGauge.backingShape = RadialGaugeBackingShape.Circular;

    // setting custom gauge ranges
    const range1 = new IgxRadialGaugeRangeComponent();
    range1.startValue = 30;
    range1.endValue = 80;
    const range2 = new IgxRadialGaugeRangeComponent();
    range2.startValue = 80;
    range2.endValue = 85;
    const range3 = new IgxRadialGaugeRangeComponent();
    range3.startValue = 85;
    range3.endValue = 100;
    this.radialGauge.rangeBrushes = ["#098765", "#e6f407", "#fd0d00"];
    this.radialGauge.rangeOutlines = ["#098765", "#e6f407", "#fd0d00"];
    this.radialGauge.ranges.clear();
    this.radialGauge.ranges.add(range1);
    this.radialGauge.ranges.add(range2);
    this.radialGauge.ranges.add(range3);

    // setting extent of all gauge ranges
    for (let i = 0; i < this.radialGauge.ranges.count; i++) {
      const range = this.radialGauge.ranges.item(i);
      range.innerStartExtent = 0.5;
      range.innerEndExtent = 0.5;
      range.outerStartExtent = 0.57;
      range.outerEndExtent = 0.57;
    }
  }

}
